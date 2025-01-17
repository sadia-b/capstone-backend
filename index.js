import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product-routes.js";
const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});
