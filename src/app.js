import express from 'express';
import session from "express-session";
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from "cookie-parser";
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import orderRoutes from './routes/orderRoutes.js';
import "./config/auth.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());  
app.use(passport.session());


app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send({ message: 'API is running...' });
  });
  
  app.use(notFound);
  app.use(errorHandler);
  
  export default app;
