import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  const thailandTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  console.log(`[${thailandTime.toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use("/auth", authRoutes);

export default app;
