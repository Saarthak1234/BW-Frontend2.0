import type React from "react"
import { useState, useEffect } from "react"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react"
import { Zilla_Slab } from "next/font/google"

// Configure the Google Font
const zillaSlab = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zilla-slab",
})

interface Product {
  id?: number
  name: string
  price: number
  image: string
  description: string
  shortDescription: string
  createdAt?: string
}

interface ProductFormData {
  name: string
  price: number
  image: string
  description: string
  shortDescription: string
}

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const productName = params.name as string // Using name instead of id based on your reference code

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    image: "",
    description: "",
    shortDescription: "",
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

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
          const productData = result.data
          setProduct(productData)
          
          // Initialize form data with fetched product data
          setFormData({
            name: productData.name || "",
            price: productData.price || 0,
            image: productData.image || "",
            description: productData.description || "",
            shortDescription: productData.shortDescription || "",
          })
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? Number(value) : value,
    }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleUpdate = async () => {
    try {
      setIsUpdating(true)

      // Make API call to update the product
      const response = await fetch(`/api/products/${productName}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        console.error('Failed to update product:', response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        console.log("Updated product data:", result.data)
        setUpdateSuccess(true)
        
        // Update the product state with the new data
        setProduct(result.data)

        // Hide success message after 3 seconds
        setTimeout(() => {
          setUpdateSuccess(false)
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to update product')
      }
    } catch (err) {
      console.error('Error updating product:', err)
      // You might want to show an error message to the user here
      alert('Failed to update product. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      // Make API call to delete the product
      const response = await fetch(`/api/products/${productName}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        console.log("Deleted product:", productName)
        
        // Redirect to products page after successful deletion
        router.push("/admin/products")
      } else {
        throw new Error(result.error || 'Failed to delete product')
      }
    } catch (err) {
      console.error('Error deleting product:', err)
      // You might want to show an error message to the user here
      alert('Failed to delete product. Please try again.')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <div className={`min-h-screen bg-amber-50 ${zillaSlab.variable}`}>
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-amber-50/80 backdrop-blur-sm border-none p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-50 text-gray-600 hover:text-amber-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex gap-3">
            {/* Update Success Message */}
            {updateSuccess && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                Product updated successfully!
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Product Edit Content */}
      <div className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Product Image and Basic Info */}
          <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row bg-amber-50">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square relative bg-gray-100">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt={formData.name}
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

                {/* Image URL Input */}
                <div className="p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors pr-12"
                      placeholder="https://example.com/image.jpg"
                    />
                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors ${zillaSlab.className}`}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.1"
                      className="w-full text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600 bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors"
                    />
                  </div>

                  {/* Short Description */}
                  <div className="border-t border-gray-100 pt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full text-gray-700 leading-relaxed text-sm sm:text-base bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/200 characters</p>
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
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">{formData.description.length}/1000 characters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className={`text-xl font-bold text-gray-900 mb-4 ${zillaSlab.className}`}>Delete Product</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{formData.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}