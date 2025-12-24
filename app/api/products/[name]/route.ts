import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/[id] - Fetch a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params:  { name: string } }
) {
  try {
    const { name } = params

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product ID is required'
        },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: {
        name: name
      }
    })

    if (!product) {
      return NextResponse.json(
        {
      success: false,
          error: 'Product not found'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product'
      },
      { status: 500 }
    )
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const productName = decodeURIComponent(params.name)
    const body = await request.json()
    
    // Only include fields that are present in the request
    const updateData: any = {}
    
    if (body.name !== undefined) updateData.name = body.name
    if (body.image !== undefined) updateData.image = body.image
    if (body.description !== undefined) updateData.description = body.description
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription
    
    // Handle price separately due to type conversion
    if (body.price !== undefined) {
      const priceAsNumber = parseFloat(body.price)
      if (isNaN(priceAsNumber) || priceAsNumber < 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'Price must be a valid positive number'
          },
          { status: 400 }
        )
      }
      updateData.price = priceAsNumber
    }

    // If no fields to update were provided
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid fields provided for update'
        },
        { status: 400 }
      )
    }

    // First find the product by name
    const existingProduct = await prisma.product.findFirst({
      where: { name: productName }
    })

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found'
        },
        { status: 404 }
      )
    }

    // Then update using the ID
    const updatedProduct = await prisma.product.update({
      where: { id: existingProduct.id },
      data: updateData
    })

    return NextResponse.json({ 
      success: true,
      data: updatedProduct
    })

  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update product'
      },
      { status: 500 }
    )
  }
}

// Add this DELETE method to your existing route file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    // Safely decode the product name
    let productName: string;
    try {
      productName = decodeURIComponent(params.name);
    } catch (decodeError) {
      console.error('URL decode error:', decodeError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid product name format in URL'
        },
        { status: 400 }
      );
    }

    console.log('Attempting to delete product:', productName);

    // First find the product by name to check if it exists
    const existingProduct = await prisma.product.findFirst({
      where: { name: productName }
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found'
        },
        { status: 404 }
      );
    }

    // Delete the product using its ID
    const deletedProduct = await prisma.product.delete({
      where: { id: existingProduct.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      data: {
        deletedProduct: {
          id: deletedProduct.id,
          name: deletedProduct.name
        }
      }
    });

  } catch (error:any) {
    console.error('Error deleting product:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found'
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete product'
      },
      { status: 500 }
    );
  }
}