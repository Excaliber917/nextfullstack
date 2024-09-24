import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Define public routes that can be accessed without being logged in
    const isPublic = ['/login', '/signup', '/verifyemail'].includes(path);

    // Get the auth token from cookies (for logged-in users)
    const token = req.cookies.get("token")?.value || '';
   
    // Check if the user is trying to access the reset password route
    const isResetPasswordRoute = path === '/resetpassword';

    if (isResetPasswordRoute) {
        const queryToken = req.nextUrl.searchParams.get('token');
       
        // Allow access to the resetpassword route only if either the user is logged in OR a valid reset token is in the URL
        if (!token || !queryToken) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }

        // If there's either a valid JWT token or a reset token in the query, proceed
        return NextResponse.next();
    }

    // If trying to access a protected route without a token, redirect to login
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // If the user is logged in and tries to access a public page, redirect to homepage (or profile page)
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // Allow the request if none of the conditions match
    return NextResponse.next();
}

// Specify the routes the middleware should apply to
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/resetpassword',
    ],
};
