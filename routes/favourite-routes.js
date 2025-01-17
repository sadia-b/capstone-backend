import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.route("/").post(async (req, res) => {
  console.log(req.body);

  const { product_id, user_id } = req.body;

  if (!product_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Missing 'product_id' or 'user_id' field." });
  }

  try {
    const [newFavouriteId] = await knex("favourite").insert({
      product_id,
      user_id,
    });

    console.log(newFavouriteId);

    const newFavouriteData = await knex("favourite")
      .join("product", "product.id", "favourite.product_id")
      .select(
        "product.id",
        "product.type",
        "product.time",
        "product.concern",
        "product.brand",
        "product.name",
        "product.ingredient",
        "product.price",
        "product.photo",
        "product.photoDescription",
        "product.link"
      )
      .where("favourite.id", newFavouriteId);

    res.status(201).json(newFavouriteData[0]);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error favouriting product`, error: error.message });
  }
});

export default router;
