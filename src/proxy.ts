import { NextRequest, NextResponse } from "next/server";

const SHORT_LINK_HOST = "go.theballplex.com";

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname !== SHORT_LINK_HOST) {
    return NextResponse.next();
  }

  const match = request.nextUrl.pathname.match(/^\/([^/]+)\/?$/);
  if (!match) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/short-link-handler/${encodeURIComponent(match[1])}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
