import express from "express";
import "dotenv/config";
import cors from "cors";
import { connect } from "./config/mongoose";
import { createServer } from "node:http";
import { router } from "./routes/indexRouter";

export const app = express();
export const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();

app.use("/", router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
