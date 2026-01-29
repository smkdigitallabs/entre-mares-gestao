import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/auth/google", "/auth/google/callback", "/auth/logout"];

const encoder = new TextEncoder();

function base64UrlEncode(data: Uint8Array) {
  let string = "";
  data.forEach((byte) => {
    string += String.fromCharCode(byte);
  });
  const base64 = btoa(string);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function verifySessionToken(token: string, secret: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const data = encoder.encode(`${header}.${payload}`);
  const signed = new Uint8Array(await crypto.subtle.sign("HMAC", key, data));
  const expected = base64UrlEncode(signed);
  if (expected !== signature) return null;
  const payloadBytes = base64UrlDecode(payload);
  const payloadText = new TextDecoder().decode(payloadBytes);
  const decoded = JSON.parse(payloadText) as { exp?: number };
  if (!decoded.exp || decoded.exp * 1000 < Date.now()) return null;
  return decoded;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  const sessionSecret = process.env.APP_SESSION_SECRET;

  if (!sessionSecret) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "missing_env");
    return NextResponse.redirect(loginUrl);
  }

  const cookieToken = request.cookies.get("em_session")?.value;

  if (!cookieToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const verified = await verifySessionToken(cookieToken, sessionSecret);

  if (!verified) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
