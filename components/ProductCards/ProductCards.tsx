"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Zilla_Slab } from "next/font/google"
import { BarLoader, BounceLoader, PuffLoader, RingLoader } from "react-spinners"

// Configure the Google Font
const zillaSlab = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zilla-slab",
})

export default function ProductsSection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch products from API
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

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen bg-amber-50 py-12 sm:py-16 lg:py-24 ${zillaSlab.variable}`}>
        <div className="container mx-auto px-4">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-900 ${zillaSlab.className}`}>
            Our Premium Products
          </h1>
          <div className="flex justify-center items-center min-h-[400px]">
            {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div> */}
            <PuffLoader
            color={"#D97706"}
            loading={loading}
            // cssOverride={override}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader" />
          </div>
          
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen bg-amber-50 py-12 sm:py-16 lg:py-24 ${zillaSlab.variable}`}>
        <div className="container mx-auto px-4">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-900 ${zillaSlab.className}`}>
            Our Premium Products
          </h1>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-amber-50 py-12 sm:py-16 lg:py-24 ${zillaSlab.variable}`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-900 ${zillaSlab.className}`}>
          Our Premium Products
        </h1>
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
                <h3 className={`font-semibold text-gray-900 mb-2 text-sm ${zillaSlab.className}`}>
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-amber-600">₹{Number(product.price).toFixed(2)}</span>
                </div>

                {/* Short Description */}
                <div className="mb-4">
                  <p className="text-gray-600 text-sm line-clamp-2 font-circe">
                    {product.shortDescription}
                  </p>
                </div>

                {/* View Description Button */}
                <Link href={`/products/${product.name}`} className="flex justify-center">
                  <button className="w-auto sm:w-1/2 bg-amber-500 text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 ease-in-out text-sm rounded-sm font-semibold">
                    View Details
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