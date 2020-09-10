/**
 * This file contains all the vendor routes
 */
import Vendor from '../models/vendorModel'
import express from "express";
import controller from "../controllers/vendorController";
import validator from "../validators/vendorValidators";
import {
  handleValidationErrors
} from "../errorHandlers/ErrorHandlers";
import authorize from "../middlewares/auth";
import {
  check
} from "express-validator";
import passwordResetValidator from '../validators/passwordResetValidator'
import shoppingValidator from '../validators/shoppingValidators'

const router = express.Router();

//POST Vendor Signup
router.post("/signup", validator.signup, handleValidationErrors, controller.signup);

//POST Vendor Login
router.post("/login", validator.login, handleValidationErrors, controller.login);

//GET Get vendor details
router.get("/", authorize, controller.getDetails);

//PATCH Update vendor profile
router.patch("/", authorize, validator.update, handleValidationErrors, controller.update);

//GET Get All Vendor Orders
router.get("/orders", authorize, controller.getOrders);

//POST Accept/Cancel/Delivered order
router.post("/order/:action/:orderId", authorize, shoppingValidator.vendorAction, handleValidationErrors, controller.action);

//GET Logout
router.get('/logout', authorize, controller.logout)

export default router;