import express from "express";
import { Product, Review } from "../../db/models/index.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: Review,
        where: {
          ...(req.query.search && {
            [Op.or]: [
              { name: { [Op.iLike]: `%${req.query.search}%` } },
              { description: { [Op.iLike]: `%${req.query.search}%` } },
            ],
          }),
          ...(req.query.price && {
            price: { [Op.between]: req.query.price.split(",") },
          }),

          ...(req.query.category && {
            category: { [Op.in]: req.query.category.split(",") },
          }),
        },
        ...(req.query.order && { order: [req.query.order.split(",")] }),
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Product.create(req.body);
      res.send(newElement);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findOne({
        where: {
          id: req.params.id,
        },
        include: Review,
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Product.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      Product.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

export default router;
