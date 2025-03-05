import Order from "../models/Order.js";

export const addOrderItems = async (req, res) => {
    const { subtotal, total } = req.body;

    if (!subtotal || !total) {
        return res.status(400).json({ success: false, error: "Subtotal and Total are required" });
    }

    try {
        const order = new Order({
            user: req.user._id,
            subtotal,
            total,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateOrderToPaid = async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      if (!order) {
          return res.status(404).json({ success: false, error: "Order not found" });
      }

      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};
