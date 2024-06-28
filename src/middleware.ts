import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    console.log('middleware called');

    const accessToken = request.cookies.get('COOKIES_USER_ACCESS_TOKEN');
    console.log(accessToken, "accessToken")
    if (!accessToken) {
        url.pathname = '/signin';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/cart/:path*', '/users/:path*', '/artists/:path*', '/content/:path*', '/faq/:path*', '/badge-info/:path*', '/rewards/:path*', '/orders/:path*', '/transaction/user/:path*', '/transaction/artist/:path*', '/commission', '/commission/edit', '/contact-us/:path*', '/cloud-messaging', '/database', '/staff/:path*', '/points/:path*', '/genre/:path*'],
};