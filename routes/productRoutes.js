const express = require("express");
const Product = require("../module/product.module.js");
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct} = require("../controller/productController.js");
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct),


module.exports = router;