import { NextResponse } from "next/server";
import { getSession } from "./actions/server";

export function middleware(request)
{
    if(!request.nextUrl.pathname.endsWith("/login") && !getSession())
    {
        return NextResponse.redirect(new URL("/login",request.url))
    }
}

export const config = {
    matcher:"/:path*"
}