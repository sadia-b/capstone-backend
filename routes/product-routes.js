import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const data = await knex("product");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving products: ${error}`);
  }
});

router.route("/:concern").get(async (req, res) => {
  try {
    const products = await knex("product").where({
      concern: req.params.concern,
    });
    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: `Error getting products for product ${req.params.concern}`,
    });
  }
});

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  try {
    const product = await knex("product").where({ id }).update(updatedProduct);

    if (product === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProductData = await knex("product").where({ id });
    res.json(updatedProductData[0]);
  } catch (error) {
    res.status(400).json({ message: `Error updating product: ${error}` });
  }
});

export default router;
