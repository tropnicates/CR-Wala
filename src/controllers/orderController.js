import Order from "../models/Order.js";

export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ success: false, error: "No order items" });
  }

  try {
    const order = new Order({
      orderItems,
      user: "67c02583b1cf946f19d9f72b",
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save()
        res.status(200).json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
}