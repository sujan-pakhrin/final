import React from 'react'

const Footer = () => {
  return (
    <>\
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CompanyName</h3>
              <p className="text-gray-400 mb-4">Your trusted online shopping destination with quality products and excellent service.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Fashion</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Home & Garden</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Sports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CompanyName. All rights reserved.</p>
          </div>
        </div>
      </footer></>
  )
}

export default Footer