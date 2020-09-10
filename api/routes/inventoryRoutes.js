import express from "express";
import {
    handleValidationErrors
} from "../errorHandlers/ErrorHandlers";
import productValidator from '../validators/productValidators'
import {
    check
} from "express-validator";
import controller from "../controllers/inventoryController";

const router = express.Router();

//POST Add Products to vendor inventory
router.post("/", check("productId").isArray(), handleValidationErrors, controller.addProduct);

//GET get products from vendor inventory
router.get('/', controller.getInventory)

//GET Search Product to add in invetory
router.get("/search", check("search").isString(), handleValidationErrors, controller.searchProducts);

//GET delete in vendor inventory
router.delete('/:productId', productValidator.deleteProducts, handleValidationErrors, controller.deleteProduct)

export default router