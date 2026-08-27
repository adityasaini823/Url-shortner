import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './db/index.js';
import authRoutes from './routes/auth.route.js';
import urlRoutes from './routes/url.route.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.get("/api/health", async (req, res) => {
    try{
        await db.execute(`SELECT 1`);
        res.status(200).json({ message: "Server is running" });
    } catch (error) {
        console.error("Error occurred while checking health:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.use(errorMiddleware);
async function startServer() {
  try {
    await db.execute(`SELECT 1`);
    console.log("Database connected successfully");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}
startServer();