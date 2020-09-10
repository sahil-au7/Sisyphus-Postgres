/**
 * This file contains all the address related routes.
 * Adding address, updating address, deleting address
 */
import express from "express";
import authorize from "../middlewares/auth";
import validator from "../validators/addressValidator";
import {
  handleValidationErrors
} from "../errorHandlers/ErrorHandlers";
import controller from "../controllers/addressController";

const router = express.Router();

//GET Get user addresses
router.get('/', controller.getAddress)

//POST Add address
router.post("/", validator.addAddress, handleValidationErrors, controller.addAddress);

//PATCH Update address
router.patch("/:id", validator.checkAddress, handleValidationErrors, controller.updateAddress);

//DELETE Delete address
router.delete("/:id", validator.checkAddress, handleValidationErrors, controller.deleteAddress);

export default router;