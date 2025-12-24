// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

// Single admin credentials - in production, store these securely
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH // This should be the hashed password
const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required'
        },
        { status: 400 }
      )
    }

    // Validate environment variables
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
      console.error('Missing required environment variables')
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error'
        },
        { status: 500 }
      )
    }

    // Check if email matches admin email
    if (email !== ADMIN_EMAIL) {
      console.error('Invalid email:', email, ADMIN_EMAIL)
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials'
        },
        { status: 401 }
      )
    }

    // Verify password against hashed password
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials'
        },
        { status: 401 }
      )
    }

    // Create JWT token using jose
    const secret = new TextEncoder().encode(JWT_SECRET)
    const token = await new SignJWT({ 
      email: ADMIN_EMAIL
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        email: ADMIN_EMAIL
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Login failed'
      },
      { status: 500 }
    )
  }
}