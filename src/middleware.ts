import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const cookie = req.cookies.get('token');

    if (!cookie) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    } 
    return NextResponse.next()
}
export const config = {
    matcher: '/dashboard/:path*',
}