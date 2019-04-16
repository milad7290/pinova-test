import express from "express";
import productCtrl from "../controllers/product.controller";

const router = express.Router();

router
  .route("/api/products")
  .get(productCtrl.List)
  .post(productCtrl.create);

router.route("/api/products/:productId").get(productCtrl.read);

router.param("productId", productCtrl.productByID);

export default router;
