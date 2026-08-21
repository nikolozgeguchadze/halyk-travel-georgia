import cors from "cors";
import express from "express";
import travelRouter from "./routes/travel.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());

app.use("/api/travel", travelRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Halyk Travel Georgia API listening on http://localhost:${PORT}`);
});
