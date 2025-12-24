"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Zilla_Slab } from "next/font/google"

// Configure the Google Font
const zillaSlab = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zilla-slab",
})

export default function AdminProductsSection() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success) {
          setProducts(result.data)
        } else {
          throw new Error(result.error || 'Failed to fetch products')
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className={`min-h-screen bg-amber-50 py-12 sm:py-16 lg:py-24 ${zillaSlab.variable}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-0 ${zillaSlab.className}`}
          >
            Manage Products
          </h1>
          <Link href="/admin/products/add">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:border-2 hover:border-amber-400 hover:scale-101 transition-all duration-300 border-2 border-transparent"
            >
              {/* Product Image */}
              <div className="relative h-96 sm:h-64 bg-gray-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className={`font-semibold text-gray-900 mb-2 text-sm ${zillaSlab.className}`}>{product.name}</h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-amber-600">₹{product.price}</span>
                </div>

                {/* Short Description */}
                <div className="mb-4">
                  <p className="text-gray-600 text-sm line-clamp-2 font-circe">{product.shortDescription}</p>
                </div>

                {/* Update Details Button */}
                <Link href={`/admin/products/${product.name}/edit`} className="flex justify-center">
                  <button className="w-auto sm:w-1/2 bg-amber-500 text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 ease-in-out text-sm rounded-sm font-semibold">
                    Update Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
