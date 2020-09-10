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

//TODO: get all addresses

//POST Add address
router.post("/", validator.address, handleValidationErrors, controller.addAddress);

//PATCH Update address
router.patch("/:id", controller.updateAddress);

//DELETE Delete address
router.delete("/:id", controller.deleteAddress);

export default router;