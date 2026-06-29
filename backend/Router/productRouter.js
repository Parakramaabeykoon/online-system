import express from "express";
import { createProduct, deleteProduct, getProduct, getProductid, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.get("/", getProduct)
productRouter.post("/", createProduct)
productRouter.delete("/:productID", deleteProduct)
productRouter.put("/:productID", updateProduct)
productRouter.get("/:productID", getProductid)

export default productRouter;