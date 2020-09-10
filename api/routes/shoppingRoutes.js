/**
 * This file contains all the shopping routes
 * Routes for searching, adding products to cart,
 * checkout.
 */
import express from 'express'
import {
    handleValidationErrors
} from "../errorHandlers/ErrorHandlers";
import {
    check
} from "express-validator";
import controller from '../controllers/shoppingController'
import validators from '../validators/shoppingValidators'

const router = express.Router()

//GET Search Products
router.get('/search', validators.search, handleValidationErrors, controller.search)

//POST Add products to cart
router.post('/cart', check("searchId", "Must be array of search ids").isArray(), handleValidationErrors, controller.addToCart)

//GET Get all products in cart
router.get('/cart', controller.getCart)

//POST Checkout
router.post('/checkout/:addressId', validators.checkout, handleValidationErrors, controller.checkout)

//POST Cancel Order
router.delete('/cancel/:orderId', validators.cancel, handleValidationErrors, controller.cancelOrder)

//GET Get All User Orders
router.get('/orders', controller.getOrders)

export default router