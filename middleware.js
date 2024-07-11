import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request) {
  const { req, res } = request;

  // Get the Kinde server session
  const { isAuthenticated } = getKindeServerSession(req, res);

  const isAuthed = await isAuthenticated();

  // If not authenticated, redirect to the login page
  if (!isAuthed) {
    const redirectUrl = new URL('/api/auth/login', request.url);
    redirectUrl.searchParams.append('post_login_redirect_url', request.url);
    return NextResponse.redirect(redirectUrl.toString());
  }

  // If authenticated, proceed to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: '/details/:path*', // Adjust as per your route structure
};