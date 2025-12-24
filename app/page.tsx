"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wheat, Phone, Mail, MapPin, Award, DollarSign, Package } from "lucide-react"
import Link from "next/link"
import { Zilla_Slab } from "next/font/google"
import Image from "next/image";

// Configure the Google Font
const zillaSlab = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zilla-slab",
})

type CardId = "whole-wheat" | "all-purpose" | "bread" | "corn"

interface Product {
  id: CardId
  title: string
  price: string
  description: string
  badge: string
  badgeColor: string
  gradient?: string
  imageUrl?: string
  iconColor: string
  badgeTextColor: string
  details: string[]
}

interface ExpandedCardsState {
  [key: string]: boolean
}

export default function HomePage() {
  const router = useRouter()
  const [expandedCards, setExpandedCards] = useState<ExpandedCardsState>({})

  const toggleCard = (cardId: CardId): void => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  const handleLoginClick = () => {
    router.push("/auth/login")
  }

  const products: Product[] = [
    {
      id: "whole-wheat",
      title: "Whole Wheat Flour",
      price: "₹8.99",
      description: "Stone-ground from premium whole wheat kernels, perfect for healthy breads and baking.",
      badge: "Premium Quality",
      badgeColor: "amber",
      gradient: "from-amber-50 to-amber-200",
      imageUrl: "https://5.imimg.com/data5/QW/SD/MY-17256771/wheat-m-p-500x500.jpg",
      iconColor: "text-amber-600",
      badgeTextColor: "text-amber-800",
      details: [
        "Stone-ground for maximum nutrition retention",
        "High fiber content for healthier baking",
        "Perfect for artisan breads and wholesome pastries",
        "Sourced from organic wheat farms",
        "Rich, nutty flavor profile",
        "Contains natural wheat germ and bran",
      ],
    },
    {
      id: "all-purpose",
      title: "All Purpose Flour",
      price: "₹6.99",
      description: "The baker's favorite - versatile, reliable flour perfect for all your cooking and baking needs.",
      badge: "Versatile Choice",
      badgeColor: "blue",
      gradient: "from-blue-100 to-blue-200",
      imageUrl:
        "https://www.unlockfood.ca/EatRightOntario/media/Website-images-resized/All-about-grain-flours-resized.jpg",
      iconColor: "text-blue-600",
      badgeTextColor: "text-blue-800",
      details: [
        "Perfect protein content for versatile use",
        "Ideal for cakes, cookies, and quick breads",
        "Consistent results every time",
        "Fine texture for smooth batters",
        "Long shelf life when stored properly",
        "Professional baker approved",
      ],
    },
    {
      id: "corn",
      title: "Corn Flour",
      price: "₹9.99",
      description: "High-protein flour specially milled for exceptional bread making with superior rise and texture.",
      badge: "High Protein",
      badgeColor: "green",
      gradient: "from-green-100 to-green-200",
      imageUrl:
        "https://www.diet-health.info/images/recipes/700/maismehl-corn-flour-by-yesphotographers-fotolia-180054643-1.jpg",
      iconColor: "text-green-600",
      badgeTextColor: "text-green-800",
      details: [
        "12-14% protein content for strong gluten development",
        "Creates exceptional bread structure and chew",
        "Perfect for sourdough and artisan breads",
        "Superior rise and oven spring",
        "Milled from hard wheat varieties",
        "Preferred by professional bakers worldwide",
      ],
    },
  ]

  return (
    <div className={`font-manrope ${zillaSlab.variable}`}>
      <section className="">
        <div className="relative hero bg-yellow-50 text-white min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://marvel-b1-cdn.bc0a.com/f00000000229348/www.silversneakers.com/wp-content/uploads/2024/01/WholeGrains_835833518-1024x683.jpg"
              alt="Premium flour and grains"
              width={1024}
              height={683}
              className="w-full h-full object-cover"
              priority = {true}
            />

            {/* FIXED: Reduced z-index from no explicit z-index to z-0 to ensure it stays behind dropdown */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>
          </div>
          {/* Content */}
          <div className="hero-content relative z-10 flex items-center justify-center h-full">
            <div className="max-w-3xl text-center px-4 sm:px-6">
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 ${zillaSlab.className}`}
              >
                Premium Quality <span className="text-amber-400">Flour</span> for Every Need
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 leading-relaxed font-circe px-2">
                From artisan baking to everyday cooking, discover our extensive collection of premium flour varieties.
                Sourced from the finest grains and milled to perfection for exceptional results every time.
              </p>
              <Link
                href="/products"
                className="btn btn-primary bg-amber-500 border-none shadow-lg text-white hover:bg-amber-600 transition-colors text-base sm:text-lg px-6 sm:px-8 py-3 flex items-center justify-center font-circe mx-auto w-fit"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-amber-50 px-4 sm:px-6 md:px-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-2xl sm:text-3xl font-medium text-black sm:text-4xl mb-6 sm:mb-8 ${zillaSlab.className}`}
            >
              Our Story
            </h2>
            <p className="text-base sm:text-lg text-gray-900 mb-4 sm:mb-6 font-circe">
              It all began in 1995, in a tiny corner of Bakery City, with a second-hand mill and a big dream. My
              parents, both lifelong bakers, wanted to make flour the way it should be—fresh, honest, and full of
              flavor. We started small, delivering sacks of flour in the back of our old pickup, chatting with every
              customer along the way.
            </p>
            <p className="text-sm sm:text-base text-gray-900 mb-4 sm:mb-6 font-circe">
              Over the years, our family grew—and so did our business. We still believe in the same things: working
              closely with local farmers, never cutting corners, and always putting people first. Every bag of
              SuperMarket flour is a little piece of that story.
            </p>
            <div className="mt-6 sm:mt-8 border-l-4 border-amber-400 pl-4 sm:pl-6 text-left max-w-2xl mx-auto">
              <span className={`block text-amber-700 font-semibold mb-2 text-sm sm:text-base ${zillaSlab.className}`}>
                A note from our founder:
              </span>
              <span className="italic text-gray-700 text-base sm:text-lg font-circe">
                "We're not just selling flour. We're sharing a tradition, one loaf at a time."
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-amber-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white">
            {/* Product 1 - Image Left, Content Right */}
            <div className="flex flex-col lg:flex-row items-stretch min-h-[300px] sm:min-h-[350px] lg:h-[28rem]">
              <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-full">
                <img
                  src="https://5.imimg.com/data5/QW/SD/MY-17256771/wheat-m-p-500x500.jpg"
                  alt="All-Purpose Flour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-6 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <h3 className={`text-2xl sm:text-3xl font-medium text-gray-900 mb-4 sm:mb-6 ${zillaSlab.className}`}>
                  Premium All-Purpose Flour
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg font-circe">
                  Perfect for all your baking needs. This versatile flour delivers consistent results whether you're
                  making bread, cakes, or pastries. Sourced from the finest wheat and milled to perfection.
                </p>
                <div className="mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-circe">₹12.99</span>
                  <span className="text-gray-500 ml-2 text-base sm:text-lg font-circe">per 5lb bag</span>
                </div>
                <div>
                  <Link href='/products'>
                    <button className="bg-amber-400 text-white py-3 sm:py-4 px-4 hover:bg-gray-800 transition-colors text-base sm:text-lg rounded-sm font-semibold font-circew-1/2  sm:w-auto">
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Product 2 - Content Left, Image Right */}
            <div className="flex flex-col lg:flex-row-reverse items-stretch min-h-[300px] sm:min-h-[350px] lg:h-[28rem]">
              <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-full">
                <img
                  src="https://www.unlockfood.ca/EatRightOntario/media/Website-images-resized/All-about-grain-flours-resized.jpg"
                  alt="Whole Wheat Flour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left lg:pl-6 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <h3 className={`text-2xl sm:text-3xl font-medium text-gray-900 mb-4 sm:mb-6 ${zillaSlab.className}`}>
                  Organic Whole Wheat Flour
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg font-circe">
                  Stone-ground from organic wheat, this flour adds rich flavor and nutrition to your baked goods.
                  Perfect for hearty breads and muffins with exceptional taste and texture.
                </p>
                <div className="mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-circe">₹15.99</span>
                  <span className="text-gray-500 ml-2 text-base sm:text-lg font-circe">per 5lb bag</span>
                </div>
                <div>
                  <Link href='/products'>
                    <button className="bg-amber-400 text-white py-3 sm:py-4 px-4 hover:bg-gray-800 transition-colors text-base sm:text-lg rounded-sm font-semibold font-circew-1/2  sm:w-auto">
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Product 3 - Image Left, Content Right */}
            <div className="flex flex-col lg:flex-row items-stretch min-h-[300px] sm:min-h-[350px] lg:h-[28rem]">
              <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-full">
                <img
                  src="https://www.diet-health.info/images/recipes/700/maismehl-corn-flour-by-yesphotographers-fotolia-180054643-1.jpg"
                  alt="Bread Flour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-6 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <h3 className={`text-2xl sm:text-3xl font-medium text-gray-900 mb-4 sm:mb-6 ${zillaSlab.className}`}>
                  High-Protein Bread Flour
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg font-circe">
                  Specially formulated for bread making with higher protein content. Creates strong gluten structure for
                  perfect rise and texture in artisan breads and pizza dough.
                </p>
                <div className="mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-circe">₹14.99</span>
                  <span className="text-gray-800 ml-2 text-base sm:text-lg font-circe">per 5lb bag</span>
                </div>
                <div>
                  <Link href='/products'>
                    <button className="bg-amber-400 text-white py-3 sm:py-4 px-4 hover:bg-gray-800 transition-colors text-base sm:text-lg rounded-sm font-semibold font-circew-1/2  sm:w-auto">
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-amber-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className={`text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 ${zillaSlab.className}`}>
            Nourishing Homes, One Bake at a Time
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-circe">
            At the heart of every kitchen lies the promise of warmth, tradition, and togetherness. Whether you're baking for
            family, friends, or simply yourself, we're honored to be a part of your journey. Thank you for choosing us to be a
            small yet meaningful ingredient in your story.
          </p>
        </div>
      </section>


      {/* Footer */}
      <section>
        <footer className="bg-gray-900 text-white py-12 sm:py-16 font-manrope">
          <div className="container px-4">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* Company Info */}
              <div className="space-y-4 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Wheat className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400" />
                  <span className={`text-xl sm:text-2xl font-bold ${zillaSlab.className}`}>SuperMarket</span>
                </div>
                <p className="text-gray-300 font-manrope text-sm sm:text-base">
                  Your trusted source for premium quality flour and baking ingredients. Serving bakers and cooking
                  enthusiasts since 1995.
                </p>
              </div>
              {/* Quick Links */}
              <div className="space-y-4 text-center sm:text-left">
                <h3 className={`text-base sm:text-lg font-semibold ${zillaSlab.className}`}>Quick Links</h3>
                <div className="space-y-2 font-manrope text-sm sm:text-base">
                  <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                  <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">
                    Products
                  </Link>
                  <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                  <Link href="/auth/login" className="block text-gray-300 hover:text-white transition-colors">
                    Login
                  </Link>
                </div>
              </div>
              {/* Contact Info */}
              <div className="space-y-4 text-center sm:text-left sm:col-span-2 lg:col-span-2">
                <h3 className={`text-base sm:text-lg font-semibold ${zillaSlab.className}`}>Contact Us</h3>
                <div className="space-y-3 font-manrope text-sm sm:text-base">
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 flex-shrink-0" />
                    <span className="text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 flex-shrink-0" />
                    <span className="text-gray-300">info@supermarket.com</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 flex-shrink-0" />
                    <span className="text-gray-300">123 Flour Street, Bakery City, BC 12345</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center font-manrope">
              <p className="text-gray-400 text-sm sm:text-base">
                © {new Date().getFullYear()} SuperMarket. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}