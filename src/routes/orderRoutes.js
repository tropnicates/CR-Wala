import express from "express";
import { addOrderItems,updateOrderToPaid} from "../controllers/orderController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", addOrderItems);
router.route('/:id/pay').put( updateOrderToPaid);

export default router;