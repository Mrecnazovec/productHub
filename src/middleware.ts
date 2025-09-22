import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PUBLIC_URL, PROTECTED_URL } from '@/config/url.config'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('auth_token')?.value
	const { pathname } = req.nextUrl

	const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/product')

	if (isProtected && !token) {
		return NextResponse.redirect(new URL(PUBLIC_URL.login(), req.url))
	}

	const isAuthPage = pathname.startsWith(PUBLIC_URL.login()) || pathname.startsWith(PUBLIC_URL.register())

	if (isAuthPage && token) {
		return NextResponse.redirect(new URL(PROTECTED_URL.dashboard(), req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/product/:path*', '/login', '/register'],
}
