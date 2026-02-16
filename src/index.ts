import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import authRoutes from "./routes/auth.routes";
import sequelize ,{ DBConnection } from "./database/db";
import userRoutes from "./routes/users.routes"
import rewardRoutes from "./routes/reward.routes"
import pointRoutes from "./routes/point.routes"
import rewardUsedRoutes from "./routes/rewardUsed.routes"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
const app = express();

(async () => {
  await DBConnection();
  await sequelize.sync({ alter: true });
})();

app.use(cors({
  origin: [`${process.env.WEB_URL}`, "http://localhost:5173", "http://localhost:8888"],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  const thailandTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  console.log(`[${thailandTime.toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);

app.use("/api", userRoutes)
app.use("/api", rewardRoutes)
app.use("/api", pointRoutes)
app.use("/api", rewardUsedRoutes)

export default app;
