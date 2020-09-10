import {
    handleErrors
} from '../errorHandlers/ErrorHandlers'
import search from '../services/searchService'
import shoppingService from '../services/shoppingServices'

const controller = {}

//Search
controller.search = async (req, res) => {
    try {
        //Perform search
        const results = await search.userSearch(req)

        res.status(200).json(results)
    } catch (e) {
        handleErrors(e, res)
    }
}

//Add to cart
controller.addToCart = async (req, res) => {
    try {
        //Add to cart
        const results = await shoppingService.addToCart(req)

        res.status(200).json(results)
    } catch (e) {
        handleErrors(e, res)
    }
}

//Get All Products in cart
controller.getCart = async (req, res) => {
    try {
        //Add to cart
        const results = await shoppingService.getCart(req)

        res.status(200).json(results)
    } catch (e) {
        handleErrors(e, res)
    }
}

//Checkout 
controller.checkout = async (req, res) => {
    try {
        //Checkout 
        const results = await shoppingService.checkout(req)

        res.status(200).json(results)
    } catch (e) {
        handleErrors(e, res)
    }
}

//Cancel Order 
controller.cancelOrder = async (req, res) => {
    try {
        //Checkout 
        const results = await shoppingService.cancelOrder(req)

        res.status(200).json(results)
    } catch (e) {
        handleErrors(e, res)
    }
}

//Get All orders
controller.getOrders = async (req, res) => {
    try {
        //Checkout 
        const results = await shoppingService.getUserOrders(req)

        res.status(200).json(results)
    } catch (e) {
        handleErrors(e, res)
    }
}

export default controller