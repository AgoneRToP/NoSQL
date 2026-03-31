import express from "express";
import { APP_PORT } from "./configs/app.config.js";
import { connectDB } from "./configs/db.config.js";
import apiRouter from "./routes/index.js";

const app = express();

app.use(express.json());

await connectDB();

app.use("/api", apiRouter);

app.all("*splat", (req, res) => {
  res.status(404).send({
    success: false,
    message: `Given URL: ${req.url} not found!`,
  });
});

app.listen(APP_PORT, () => {
  console.log(`listening on ${APP_PORT}`);
});
