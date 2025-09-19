import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  FaTimes,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBox,
  FaExclamationTriangle,
  FaCheckCircle,
  FaStar,
  FaMoneyBillWave,
} from "react-icons/fa";
import axios from "axios";

const OrderCard = ({ product, onClose, onOrderSuccess }) => {
  const {user} =useContext(AuthContext);
  console.log()
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const currentPrice = product.salePrice || product.price;
  const subtotal = currentPrice * quantity;
  const shipping = subtotal > 5000 ? 0 : 150;
  const totalAmount = subtotal + shipping;

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityChange = (newQuantity) => {
    const validQuantity = Math.max(
      1,
      Math.min(product.totalStock, newQuantity)
    );
    setQuantity(validQuantity);
  };

  const validateForm = () => {
    if (quantity < 1 || quantity > product.totalStock) {
      setError("Invalid quantity selected");
      return false;
    }

    const requiredFields = Object.values(shippingAddress);
    if (requiredFields.some((field) => field.trim() === "")) {
      setError("Please fill in all shipping address fields");
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validateForm()) return;

    setError("");
    setLoading(true);

    try {
      // Replace this with your actual API call
      // const res = await axios.post("/api/order", {
      //   user: userId,
      //   product: product._id,
      //   quantity,
      //   shippingAddress,
      //   paymentMethod,
      //   totalAmount,
      // });

      const formData = {
        user:user.id,
        product: product._id,
        quantity: quantity,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
      };

      console.log(formData);
      await axios.post('/api/order',formData).then((res)=>{
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          onOrderSuccess(res.data);
          onClose();
        }, 1500);

      }).error((err)=>{
        setLoading(false);
        setError(err.response?.data?.message || "Failed to place order");
      })

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to place order");
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  const fieldLabels = {
    fullName: "Full Name",
    address: "Street Address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 mx-4 text-center shadow-2xl">
          <div className="mb-4">
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600">
            Your order has been received and is being processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Complete Your Order
              </h2>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={onClose}
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left Column - Product & Form */}
          <div className="space-y-6">
            {/* Product Summary */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
              <div className="flex gap-4">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span>{product.brand}</span>
                    <span>{product.category}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    {renderStars(Math.floor(product.averageReview))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.averageReview})
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    {product.salePrice ? (
                      <>
                        <span className="text-xl font-bold text-blue-600">
                          Rs. {product.salePrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          Rs. {product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-blue-600">
                        Rs. {product.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded">
                <FaExclamationTriangle className="w-5 h-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <FaBox className="w-4 h-4" />
                Quantity ({product.totalStock} available)
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 flex items-center justify-center font-bold text-lg transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.totalStock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-20 text-center px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bold text-lg"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.totalStock}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 flex items-center justify-center font-bold text-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <FaMapMarkerAlt className="w-4 h-4" />
                Shipping Address
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(shippingAddress).map((field) => (
                  <div key={field}>
                    <input
                      name={field}
                      placeholder={fieldLabels[field]}
                      value={shippingAddress[field]}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Payment Method */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FaCreditCard className="w-4 h-4" />
                Payment Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  {
                    value: "cash",
                    label: "Cash on Delivery",
                    icon: <FaMoneyBillWave className="w-5 h-5" />,
                  },
                  {
                    value: "online",
                    label: "Online Payment",
                    icon: <FaCreditCard className="w-5 h-5" />,
                  },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition ${
                      paymentMethod === method.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <span className="mr-2">{method.icon}</span>
                    <span className="text-sm font-semibold">
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaShoppingCart className="w-5 h-5" />
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Item Price</span>
                  <span className="font-semibold">
                    Rs. {currentPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold">× {quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span
                    className={`font-semibold ${
                      shipping === 0 ? "text-green-600" : ""
                    }`}
                  >
                    {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      Rs. {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full bg-blue-600 0 hover:indigo-700 disabled:gray-400  text-white py-2 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </div>
                ) : (
                  `Place Order • Rs. ${totalAmount.toLocaleString()}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
