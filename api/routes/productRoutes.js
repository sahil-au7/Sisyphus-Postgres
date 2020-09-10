/**
 * This file contains all the product related routes
 * Adding products to algolia
 * Getting products from algolia
 * 
 * NOTE : This is an Admin api for adding and deleting item from algolia
 */
import express from 'express'
import controller from '../controllers/productController'
import validator from '../validators/productValidators'
import {
    handleValidationErrors
  } from "../errorHandlers/ErrorHandlers";

const router = express.Router()

//============================THIS IS AN ADMIN API ROUTE=====================================
//POST 
router.post('/', validator.addProduct, handleValidationErrors, controller.addProduct)
//============================THIS IS AN ADMIN API ROUTE=====================================


export default router