// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products'
      },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, image, description, shortDescription } = body

    // Basic validation
    if (!name || !price || !description || !shortDescription) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, price, description, shortDescription'
        },
        { status: 400 }
      )
    }

    // Convert price to number for Decimal field
    const priceAsNumber = parseFloat(price)
    if (isNaN(priceAsNumber) || priceAsNumber < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Price must be a valid positive number'
        },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: priceAsNumber,
        image: image || null,
        description,
        shortDescription
      }
    })

    return NextResponse.json({
      success: true,
      data: product
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product'
      },
      { status: 500 }
    )
  }
}

