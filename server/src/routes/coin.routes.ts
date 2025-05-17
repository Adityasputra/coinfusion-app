// src/routes/coin.routes.ts
import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/list", async (_req, res) => {
  try {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch coin list" });
  }
});

export default router;
