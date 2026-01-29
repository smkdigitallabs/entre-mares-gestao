import { NextResponse } from "next/server";

const encoder = new TextEncoder();

function base64UrlEncode(data: Uint8Array) {
  let string = "";
  data.forEach((byte) => {
    string += String.fromCharCode(byte);
  });
  const base64 = btoa(string);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function signSession(payload: Record<string, unknown>, secret: string) {
  const header = base64UrlEncode(encoder.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(`${header}.${body}`)));
  return `${header}.${body}.${base64UrlEncode(signature)}`;
}

function clearCookie(response: NextResponse, name: string) {
  response.cookies.set(name, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const sessionSecret = process.env.APP_SESSION_SECRET?.trim();
  const allowedEmails = process.env.APP_ALLOWED_EMAILS;

  if (!clientId || !clientSecret || !sessionSecret) {
    console.error("[Auth] Missing environment variables");
    return NextResponse.redirect(new URL("/login?error=missing_env", request.url));
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(cookieHeader.split("; ").map((cookie) => {
    const [key, ...rest] = cookie.split("=");
    return [key, decodeURIComponent(rest.join("="))];
  }));

  const storedState = cookies.em_oauth_state;
  const codeVerifier = cookies.em_oauth_verifier;
  const nextPath = cookies.em_next || "/";

  if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", request.url));
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${url.origin}/auth/google/callback`,
      grant_type: "authorization_code",
      code_verifier: codeVerifier,
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }

  const tokenData = await tokenResponse.json();
  const idToken = tokenData.id_token as string | undefined;

  if (!idToken) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }

  const tokenInfoResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
  if (!tokenInfoResponse.ok) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }

  const profile = await tokenInfoResponse.json();
  const email = String(profile.email || "");
  const sub = String(profile.sub || "");
  const name = String(profile.name || "");
  const picture = String(profile.picture || "");

  if (!email || !sub) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }

  if (allowedEmails) {
    const allowedList = allowedEmails.split(",").map((entry) => entry.trim()).filter(Boolean);
    if (allowedList.length > 0 && !allowedList.includes(email)) {
      return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
    }
  }

  const now = Math.floor(Date.now() / 1000);
  const sessionToken = await signSession(
    {
      sub,
      email,
      name,
      picture,
      exp: now + 60 * 60 * 24 * 7,
    },
    sessionSecret
  );

  const redirectUrl = new URL("/", request.url);
  if (nextPath.startsWith("/")) {
    redirectUrl.pathname = nextPath;
  }

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("em_session", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  clearCookie(response, "em_oauth_state");
  clearCookie(response, "em_oauth_verifier");
  clearCookie(response, "em_next");

  return response;
}
