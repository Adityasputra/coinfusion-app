import express from "express";
import "dotenv/config";
import cors from "cors";
import { connect } from "./config/mongoose";
import { createServer } from "node:http";

export const app = express();
export const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await connect();
})();

app.use("")

