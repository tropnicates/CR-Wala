import express from "express";
import { addOrderItems,updateOrderToPaid} from "../controllers/orderController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated,addOrderItems);
router.route('/:id/pay').put( isAuthenticated,updateOrderToPaid);

export default router;