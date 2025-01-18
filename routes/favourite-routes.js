import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
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

      await knex("product").where("id", product_id).update({ liked: true });

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
          "product.liked",
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
  })
  .get(async (req, res) => {
    try {
      const favouritesData = await knex("favourite")
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
          "product.liked",
          "product.photo",
          "product.photoDescription",
          "product.link"
        );
      res.status(200).json(favouritesData);
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong while retrieving the favourites",
      });
    }
  });

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing 'product_id' parameter." });
  }

  try {
    const favourite = await knex("favourite").where("product_id", id).first();

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found." });
    }

    await knex("favourite").where("product_id", id).del();

    await knex("product").where("id", id).update({ liked: false });

    res.status(200).json({ message: "Favourite removed successfully." });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error removing favourite`, error: error.message });
  }
});

export default router;
