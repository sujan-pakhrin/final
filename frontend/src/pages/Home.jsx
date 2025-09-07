import React, { useState, useEffect } from "react";
import Navbar from "../components/global/Navbar";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaChevronRight,
  FaTag,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaPhone,
} from "react-icons/fa";
import Footer from "../components/global/Footer";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const popularProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 324,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 156,
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 159.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 4,
      name: "Gaming Mechanical Keyboard",
      price: 129.99,
      originalPrice: 169.99,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 234,
    },
  ];

  const recentProducts = [
    {
      id: 5,
      name: "Wireless Charging Pad",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 67,
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 112,
    },
    {
      id: 7,
      name: "Smart Home Hub",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 45,
    },
    {
      id: 8,
      name: "USB-C Fast Charger",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 98,
    },
  ];

  const heroSlides = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: "Shop the best deals on electronics, fashion, and more",
      image:
        "https://plus.unsplash.com/premium_photo-1756143417932-28719fc78d97?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cta: "Shop Now",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Latest Tech Gadgets",
      description: "Discover cutting-edge technology and innovation",
      image:
        "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cta: "Explore",
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "On Orders Over $99",
      description: "Fast and reliable delivery to your doorstep",
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cta: "Learn More",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const ProductCard = ({ product, showDiscount = false }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              Rs. {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
            <FaShoppingCart className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div></div>
      <Navbar />
      <section className="relative h-[75vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white max-w-2xl px-4">
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-2xl mb-2">{slide.subtitle}</p>
                <p className="text-lg mb-8 opacity-90">{slide.description}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center mx-auto">
                  {slide.cta}
                  <FaChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center text-center">
              <div>
                <FaTruck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $99</p>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <FaShieldAlt className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Secure Payment</h3>
                <p className="text-sm text-gray-600">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <FaUndo className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <FaPhone className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">24/7 Support</h3>
                <p className="text-sm text-gray-600">Customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Popular Products
              </h2>
              <p className="text-gray-600">
                Top-rated items loved by our customers
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center">
              View All
              <FaChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showDiscount={true}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recent Products
              </h2>
              <p className="text-gray-600">Latest additions to our catalog</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center">
              <FaTag className="w-4 h-4 mr-2" />
              New Arrivals
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
