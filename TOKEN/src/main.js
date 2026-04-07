import express from "express";
import appConfig from "./configs/app.config.js";
import { connectDb } from "./configs/db.config.js";
import apiRouter from "./routes/index.js";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import path from "node:path";

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDb()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

app.use("/api", apiRouter);

app.all("*splat", (req, res) => {
  res.status(404).send({
    success: false,
    message: `Given URL : ${req.url} not found`,
  });
});

app.use(ErrorHandlerMiddleware);

app.listen(appConfig.APP_PORT, () => {
  console.log(`listening on ${appConfig.APP_PORT}`);
});
