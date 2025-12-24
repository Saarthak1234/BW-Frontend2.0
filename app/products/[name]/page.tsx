"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Zilla_Slab } from "next/font/google"
import { PuffLoader } from "react-spinners"

// Configure the Google Font
const zillaSlab = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zilla-slab",
})

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productName = params.name as string

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch single product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        console.log(`Fetching product with name: ${productName}`)
        const response = await fetch(`/api/products/${productName}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found')
          } else {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return
        }

        const result = await response.json()

        if (result.success) {
          setProduct(result.data)
        } else {
          throw new Error(result.error || 'Failed to fetch product')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (productName) {
      fetchProduct()
    }
  }, [productName])

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen bg-amber-50 ${zillaSlab.variable}`}>
        {/* Header with Back Button */}
        <div className="sticky top-0 z-40 bg-amber-50/80 backdrop-blur-sm border-none p-4 sm:p-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-50 text-gray-600 hover:text-amber-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

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
    )
  }

  // Error or Product Not Found state
  if (error || !product) {
    return (
      <div className={`min-h-screen bg-amber-50 ${zillaSlab.variable}`}>
        {/* Header with Back Button */}
        <div className="sticky top-0 z-40 bg-amber-50/80 backdrop-blur-sm border-none p-4 sm:p-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-50 text-gray-600 hover:text-amber-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center min-h-[400px] p-4">
          <div className="text-center max-w-md w-full">
            <h1 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 ${zillaSlab.className}`}>
              {error === 'Product not found' ? 'Product Not Found' : 'Error Loading Product'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error === 'Product not found'
                ? 'The product you are looking for does not exist or has been removed.'
                : error || 'Something went wrong while loading the product.'
              }
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.back()}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 w-full sm:w-auto"
              >
                Go Back
              </button>
              {error && error !== 'Product not found' && (
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 w-full sm:w-auto ml-0 sm:ml-3"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-amber-50 ${zillaSlab.variable}`}>
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-amber-50/80 backdrop-blur-sm border-none p-4 sm:p-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-50 text-gray-600 hover:text-amber-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Product Detail Content */}
      <div className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Product Image and Basic Info */}
          <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row bg-amber-50">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square relative bg-gray-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info Section */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6">
                  <h1
                    className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight ${zillaSlab.className}`}
                  >
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600">
                      ₹{Number(product.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Short Description */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.shortDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <h2
                className={`text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 ${zillaSlab.className}`}
              >
                Product Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}