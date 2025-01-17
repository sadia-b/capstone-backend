import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product-routes.js";
import favouriteRoutes from "./routes/favourite-routes.js";
const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/products", productRoutes);
app.use("/favourite", favouriteRoutes);

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});
