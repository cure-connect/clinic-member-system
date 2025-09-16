import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import sequelize ,{ DBConnection } from "./database/db";
import createRoutes from "./routes/users.routes"
import getRoutes from "./routes/users.routes"

dotenv.config();
const app = express();

(async () => {
  await DBConnection();
  await sequelize.sync({ alter: true });
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  const thailandTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  console.log(`[${thailandTime.toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use("/auth", authRoutes);

app.use("/create", createRoutes)
app.use("/users", getRoutes)

export default app;
