import express from "express";
import sequelize, { testDB } from "./db/index.js";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
import usersRouter from "./services/users/index.js";
import categoryRouter from "./services/category/index.js";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/categories", categoryRouter);
server.use("/users", usersRouter);

server.listen(process.env.PORT || 3002, async () => {
  console.log("server is running on port ", process.env.PORT || 3002);
  await testDB();
  sequelize
    .sync()
    .then(() => {
      console.log("DB synced");
    })
    .catch((e) => {
      console.log(e);
    });
});
