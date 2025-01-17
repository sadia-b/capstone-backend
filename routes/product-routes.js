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

export default router;
