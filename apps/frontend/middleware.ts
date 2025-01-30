import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const agent = userAgent(request);

  const response = NextResponse.next();
  response.headers.set("X-User-Agent", JSON.stringify(agent));

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
