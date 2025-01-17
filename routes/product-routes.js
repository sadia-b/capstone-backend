import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await knex("product");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving products: ${error}`);
  }
});

export default router;
