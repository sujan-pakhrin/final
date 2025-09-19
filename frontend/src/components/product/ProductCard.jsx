import React, { useState } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import OrderCard from "../Order/OrderCard";

const renderStars = (rating) =>
  [...Array(5)].map((_, i) => (
    <FaStar
      key={i}
      className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
    />
  ));

const ProductCard = ({ product }) => {
  const [showOrderCard, setShowOrderCard] = useState(false);

  const handleOrderSuccess = (order) => {
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
        <div className="relative">
          <img
            src={`http://localhost:5000/${product.image}`}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>

          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center mb-3">
            {renderStars(Math.floor(product.averageReview))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.averageReview})
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-bold text-gray-900">
                    Rs. {product.salePrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    Rs. {product.price}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  Rs. {product.price}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {product.totalStock} in stock
            </span>
          </div>

          <button
            onClick={() => setShowOrderCard(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FaShoppingCart className="w-4 h-4" />
            <span>Order Now</span>
          </button>
        </div>
      </div>

      {showOrderCard && (
        <OrderCard
          product={product}
          onClose={() => setShowOrderCard(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </>
  );
};

export default ProductCard;
