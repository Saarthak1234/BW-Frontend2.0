"use client";
import { Wheat } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check for admin user data in localStorage
      // Since your backend uses HTTP-only cookies, we check for the stored user data
      const adminUser = localStorage.getItem('adminUser');
      setIsLoggedIn(!!adminUser);
    };

    checkAuthStatus();

    // Optional: Listen for storage changes to update login status across tabs
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API to clear HTTP-only cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important for sending cookies
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage data regardless of API call success
      localStorage.removeItem('adminUser');
      localStorage.removeItem('rememberAdmin');
      setIsLoggedIn(false);
      
      // Redirect to home page
      window.location.href = '/';
    }
  };

  return (
<header>
  <div className="navbar bg-gray-900 text-white shadow-lg">
    <div className="navbar-start">
      <div className="drawer lg:hidden">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="drawer-toggle" className="btn btn-ghost drawer-button text-white hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
          <aside className="min-h-full w-80 bg-gray-800 p-4">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-600">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <label htmlFor="drawer-toggle" className="btn btn-ghost btn-sm p-2 hover:bg-gray-700 text-white transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </label>
            </div>
            <div className="grid gap-6 py-2">
              <Link href="/" className="text-lg font-semibold text-white hover:text-amber-400 transition-colors">
                Home
              </Link>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Products</h3>
                <div className="grid gap-3 pl-4">
                  <Link
                    href="/products"
                    className="flex flex-col justify-start rounded-md bg-gradient-to-b from-gray-700 to-gray-600 p-4 no-underline outline-none focus:shadow-md hover:shadow-md transition-shadow border border-gray-600"
                  >
                    <Wheat className="h-5 w-5 text-amber-400 mb-2" />
                    <div className="text-base font-semibold text-white mb-1">All Products</div>
                    <p className="text-xs leading-tight text-gray-300">
                      Browse our complete selection of premium flour products
                    </p>
                  </Link>
                  <div className="grid gap-2 mt-2">
                    <Link
                      href="/products/MP Sharbati Wheat"
                      className="text-sm text-gray-300 hover:text-white transition-colors hover:bg-gray-700 rounded-md p-2"
                    >
                      MP Sharbati Wheat
                    </Link>
                    <Link
                      href="/products/Mixture"
                      className="text-sm text-gray-300 hover:text-white transition-colors hover:bg-gray-700 rounded-md p-2"
                    >
                      Mixture
                    </Link>
                    <Link
                      href="/products/Haldi"
                      className="text-sm text-gray-300 hover:text-white transition-colors hover:bg-gray-700 rounded-md p-2"
                    >
                      Haldi (Grinded)
                    </Link>
                  </div>
                </div>
              </div>
              {/* Show admin link only when logged in */}
              {isLoggedIn && (
                <div className="space-y-3 pt-4 border-t border-gray-600">
                  <h3 className="text-lg font-semibold text-white">Admin</h3>
                  <Link
                    href="/admin/products"
                    className="text-sm text-gray-300 hover:text-white transition-colors hover:bg-gray-700 rounded-md p-2 block"
                  >
                    Manage Products
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
      <Link className="btn bg-gray-900 text-white shadow-none outline-none border-none text-xl ml-7 hover:bg-gray-800" href="/">
        SuperMarket
        <Wheat className="inline h-6 w-6 text-amber-400 ml-2" />
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><Link href="/" className="text-white hover:text-amber-400 hover:bg-gray-800 transition-colors">Home</Link></li>
        <li>
          <details>
            <summary className="text-white hover:text-amber-400 hover:bg-gray-800 transition-colors">Products</summary>
            <ul className="p-4 bg-gray-800 w-[450px] -mt-4 z-50 shadow-lg border border-gray-700">
              <div className="grid gap-3">
                <div className="row-span-3 mr-2">
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-800 to-gray-700 p-6 no-underline outline-none focus:shadow-md hover:shadow-md transition-shadow"
                    href="/products"
                  >
                    <Wheat className="h-6 w-6 text-amber-400" />
                    <div className="mb-2 mt-4 text-lg font-medium text-white">All Products</div>
                    <p className="text-sm leading-tight text-gray-300">
                      Browse our complete selection of premium flour products
                    </p>
                  </Link>
                </div>
                <div className="grid gap-1 mt-3 mr-2">
                  <Link
                    href="/products/MP Sharbati Wheat"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:shadow-md text-gray-300 hover:text-white focus:bg-gray-700 focus:text-white"
                  >
                    <div className="text-sm font-medium leading-none">MP Sharbati Wheat</div>
                  </Link>
                  <Link
                    href="/products/Mixture"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:shadow-md text-gray-300 hover:text-white focus:bg-gray-700 focus:text-white"
                  >
                    <div className="text-sm font-medium leading-none">Mixture</div>
                  </Link>
                  <Link
                    href="/products/Haldi"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:shadow-md text-gray-300 hover:text-white focus:bg-gray-700 focus:text-white"
                  >
                    <div className="text-sm font-medium leading-none">Haldi (Grinded)</div>
                  </Link>
                  {/* Show admin link in desktop menu when logged in */}
                  {isLoggedIn && (
                    <Link
                      href="/admin/products"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-amber-700 hover:shadow-md text-amber-300 hover:text-white focus:bg-amber-700 focus:text-white border-t border-gray-600 mt-2 pt-3"
                    >
                      <div className="text-sm font-medium leading-none">Admin Panel</div>
                    </Link>
                  )}
                </div>
              </div>
            </ul>
          </details>
        </li>
        {/* Show admin link in main menu when logged in */}
        {isLoggedIn && (
          <li><Link href="/admin/products" className="text-amber-300 hover:text-amber-400 hover:bg-gray-800 transition-colors">Admin</Link></li>
        )}
      </ul>
    </div>
    <div className="navbar-end">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="btn bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:border-gray-600">
          Logout
        </button>
      ) : (
        <Link href="/login" className="btn bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:border-gray-600">
          Login
        </Link>
      )}
    </div>
  </div>
</header>
  );
};

export default Navbar;