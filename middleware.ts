import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest } from "next";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "secret";

// eslint-disable-next-line consistent-return
export async function middleware(req: NextApiRequest) {
  const token = await getToken({
    req, secret: NEXTAUTH_SECRET, cookieName: "token", raw: true,
  });
  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } },
    );
  }
}

export const config = {
  matcher: "/api/((?!serverConfig|login).*)",
};
