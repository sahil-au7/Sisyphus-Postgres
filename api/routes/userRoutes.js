/**
 * This file contains all the vendor routes
 */
import User from '../models/userModel'
import express from "express";
import controller from "../controllers/userController";
import validator from "../validators/userValidators";
import validator2 from '../validators/passwordResetValidator'
import {
  handleValidationErrors
} from "../errorHandlers/ErrorHandlers";
import authorize from '../middlewares/auth';

const router = express.Router();

//POST USER Signup
router.post("/signup", validator.signup, handleValidationErrors, controller.signup);

//POST USER Login
router.post("/login", validator.login, handleValidationErrors, controller.login);

//GET Get USER details
router.get("/", authorize, controller.get);

//UPDATE User Details
router.patch("/update", validator.update, handleValidationErrors, authorize, controller.update);

//GET
router.get('/logout', authorize, controller.logout)

export default router;