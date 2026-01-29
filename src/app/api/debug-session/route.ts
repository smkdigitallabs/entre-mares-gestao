import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const runtime = "edge"; // Forçar edge para simular middleware

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const cookies = Object.fromEntries(cookieHeader?.split("; ").map(c => {
    const [key, ...v] = c.split("=");
    return [key, decodeURIComponent(v.join("="))];
  }) || []);

  const token = cookies["em_session"];
  const secretStr = process.env.APP_SESSION_SECRET?.trim();
  
  const diagnostic: any = {
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 10)}...` : null,
    hasSecret: !!secretStr,
    secretLength: secretStr?.length,
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };

  if (token && secretStr) {
    try {
      const secret = new TextEncoder().encode(secretStr);
      const { payload } = await jwtVerify(token, secret);
      diagnostic.verification = "success";
      diagnostic.payload = payload;
    } catch (e: any) {
      diagnostic.verification = "failed";
      diagnostic.error = e.message;
      diagnostic.code = e.code;
    }
  } else {
    diagnostic.verification = "skipped";
    diagnostic.reason = !token ? "no_token" : "no_secret";
  }

  return NextResponse.json(diagnostic);
}
