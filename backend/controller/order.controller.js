import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res) => {
  try {
    const { user, product, quantity, shippingAddress, paymentMethod } = req.body;

    const productData = await Product.findById(product);
    if (!productData) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (productData.totalStock < quantity) {
      return res.status(400).json({ success: false, message: "Not enough stock" });
    }

    productData.totalStock -= quantity;
    await productData.save();

    const priceToUse = productData.salePrice && productData.salePrice > 0 
      ? productData.salePrice 
      : productData.price;

    const totalAmount = priceToUse * quantity;

    const order = new Order({
      user,
      product,
      quantity,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("product", "title price");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).populate(
      "product",
      "title price"
    );
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
