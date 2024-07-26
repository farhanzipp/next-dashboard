import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

interface PayloadProps {
    firstName: string,
}

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // const token = Cookies.get("token");
    // console.log(token);

    const cookie = req.cookies.get('token');
    const token:string | undefined = cookie?.value;

    if(!token){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    } 
    
    if(token){
        const decoded = jwtDecode<PayloadProps>(token)
        console.log('welcome', decoded.firstName)
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    // const session = token && isTokenValid(tokenValue) ? jwtDecode(token) : null;

    // 4. Redirect
    // if (isProtectedRoute && !session) {
    //     return NextResponse.redirect(new URL('/login', req.nextUrl));
    // }

    // if (
    //     isPublicRoute &&
    //     session &&
    //     !req.nextUrl.pathname.startsWith('/dashboard')
    // ) {
    //     return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    // }
}
export const config = {
    matcher: '/dashboard/:path*',
  }