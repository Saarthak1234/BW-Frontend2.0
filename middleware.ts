// middleware.ts (create this file in your root directory)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define protected route patterns - these will match dynamic routes too
  const protectedPatterns = [
    '/admin/dashboard',
    '/admin/products',     // This matches /admin/products, /admin/products/123, /admin/products/edit/456, etc.
    '/admin/users',        // This matches /admin/users, /admin/users/789, etc.
    '/admin/orders',       // This matches /admin/orders, /admin/orders/101112, etc.
    '/admin/settings',
    '/admin/categories',
    '/admin/inventory'
  ]

  // Check if the current path starts with any protected pattern
  const isProtectedRoute = protectedPatterns.some(pattern => pathname.startsWith(pattern))

  // Skip protection for login page to avoid redirect loops
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (isProtectedRoute) {
    console.log(`Protecting route: ${pathname}`) // Debug log

    // Get the auth token from cookies
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      console.log(`No token found for ${pathname}, redirecting to login`)
      // No token found, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify the JWT token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      
      console.log(`Token valid for ${pathname}, user: ${payload.email}`)
      
      // Token is valid, allow access
      return NextResponse.next()
    } catch (error) {
      // Token is invalid or expired, redirect to login
      console.error(`Token verification failed for ${pathname}:`, error.message)
      
      // Clear the invalid cookie
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set('auth-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      })
      
      return response
    }
  }

  // Non-protected route, allow access
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - they handle their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}