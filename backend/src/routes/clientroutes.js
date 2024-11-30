import express from "express";
import * as clientController from "../controllers/clientcontroller.js";

const router = express.Router();

router.get("/category", clientController.getClients);
router.get("/product", clientController.getProducts);

router.post("/category", clientController.createClients);
router.post("/product", clientController.createProducts);

router.put("/category/:categoryid", clientController.updateClients);
router.put("/product/:id", clientController.updateProducts);

router.delete("/category/:id", clientController.deleteClient);
router.delete("/product/:id", clientController.deleteProduct);

export default router;
