import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAdmin = request.cookies.get('admin-auth');

  // 로그인하지 않은 경우 "/access"로 리다이렉트
  if (!isAdmin) {
    const url = new URL('/access', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// "/column"에만 미들웨어 적용
export const config = {
  matcher: ['/column','/partner'],
};
