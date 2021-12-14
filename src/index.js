import express from "express";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
import cors from "cors";
import { testDB } from "./db/index.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);

server.listen(process.env.PORT || 3002, async () => {
  console.log("server is running on port ", process.env.PORT || 3002);
  await testDB();
});
