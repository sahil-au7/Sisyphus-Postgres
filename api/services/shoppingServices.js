import User from '../models/userModel'
import Status from '../enums/orderEnum'
import Order from '../models/orderModel'
import searchUtil from '../utilities/searchUtil'
import productServices from '../services/productService'
import Cart from '../models/cartModel'
import Product from '../models/productModel'

const services = {}

//Add to cart
services.addToCart = req => new Promise(async (res, rej) => {
    try {
        //Get user _id
        const _id = req._id

        //Get products
        let searchIds = typeof req.body.searchId === "string" ? [req.body.searchId] : req.body.searchId

        const cart = searchIds.map(element => {
            return {
                userId: _id,
                searchId: element
            }
        });

        //Push the products to user cart array
        const results = await Cart.insertMany(cart)
            .exec()

        res(results)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Checkout 
services.checkout = req => new Promise(async (res, rej) => {
    try {
        //Get user _id
        const _id = req._id

        //Get address _id
        const addressId = req.params.addressId

        //Get cart
        const cart = await Cart.find({
                userId: _id
            })
            .exec()

        // Create order object 
        const objs = cart.map(searchId => {
            return {
                userId: _id,
                vendorId: searchUtil.vendorId(searchId.searchId),
                productId: searchUtil.productId(searchId.searchId),
                addressId: addressId,
                status: Status.PENDING
            }
        })

        // //Save orders
        const orders = Order.insertMany(objs).exec()

        //Clear cart
        const clearCart = Cart.deleteOne({
                userId: _id
            })
            .exec()

        const results = await Promise.all([orders, clearCart])

        res(results[0])
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Cancel Order
services.cancelOrder = req => new Promise(async (res, rej) => {
    try {
        //Get order _id to cancel
        const _id = req.params.orderId

        //Get Vendor _id
        const userId = req._id

        const results = await Order.findOneAndUpdate({
                _id,
                userId
            }, {
                $set: {
                    status: Status.CANCELLED
                }
            }, {
                runValidators: true,
                new: true
            })
            .exec()

        res(results)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Vendor Action
services.vendorAction = req => new Promise(async (res, rej) => {
    try {
        //Get order _id and action
        const {
            action,
            orderId
        } = req.params

        //Get Vendor _id
        const vendorId = req._id

        const results = await Order.findOneAndUpdate({
            _id: orderId,
            vendorId
        }, {
            $set: {
                status: action
            }
        }, {
            runValidators: true,
            new: true
        }).exec()

        res(results)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Get All user orders
services.getUserOrders = req => new Promise(async (res, rej) => {
    try {
        //Get user _id
        const _id = req._id

        //Get query params
        const status = req.query.status

        //Results
        const promise = status === undefined ?
            Order.find({
                userId: _id
            }).exec() :
            Order.find({
                userId: _id,
                status
            }).exec()

        const results = await promise

        res(results.length === 0 ? `No ${status} orders` : results)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Get All vendor orders
services.getVendorOrders = req => new Promise(async (res, rej) => {
    try {
        //Get user _id
        const _id = req._id

        //Get query params
        const status = req.query.status

        //Results
        const promise = status === undefined ?
            Order.find({
                vendorId: _id
            }).exec() :
            Order.find({
                vendorId: _id,
                status
            }).exec()

        const results = await promise

        res(results.length === 0 ? `No ${status} orders` : results)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Get All Products in cart
services.getCart = req => new Promise(async (res, rej) => {
    try {
        //Get user _id
        const _id = req._id

        //Results
        const results = await Cart.find({
                userId: _id
            })
            .exec()

        //Get Products ids from search ids
        const productIds = results.map(searchId => searchUtil.productId(searchId.searchId))

        const promises = productIds.map(productId => {
            return Product.findOne({
                _id: productId
            }).exec()
        })

        //Get Products
        const results2 = await Promise.all(promises)

        res(results2.length === 0 ? 'No Products in cart' : results2)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

export default services