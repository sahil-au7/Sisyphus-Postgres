import User from '../models/userModel'
import Status from '../enums/orderEnum'
import Order from '../models/orderModel'
import searchUtil from '../utilities/searchUtil'
import productServices from '../services/productService'

const services = {}

//Add to cart
services.addToCart = req => new Promise(async (res, rej) => {
    try {
        //Get user _id
        const _id = req._id

        //Get products
        let searchIds = typeof req.body.searchId === "string" ? [req.body.searchId] : req.body.searchId

        //Push the products to user cart array
        const results = await User.findOneAndUpdate({
            _id
        }, {
            $push: {
                cart: {
                    $each: searchIds
                }
            }
        }, {
            runValidators: true,
            new: true
        })

        res(results.cart)
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
        const cart = await User.findOne({
                _id
            })
            .select('cart')

        //Create order object 
        const objs = cart.cart.map(searchId => {
            return {
                userId: _id,
                vendorId: searchUtil.vendorId(searchId),
                productId: searchUtil.productId(searchId),
                addressId: addressId,
                status: Status.PENDING
            }
        })

        //Save orders
        const orders = await Order.insertMany(objs)

        //Clear cart
        await User.findOneAndUpdate({
            _id
        }, {
            $set: {
                cart: []
            }
        })

        res(orders)
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
        })

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

        //TODO: query for full user details, vendor details, products 

        //Results
        const results = await status === undefined ?
            Order.find({
                userId: _id
            }) :
            Order.find({
                userId: _id,
                status
            }).lean()

        res(results)
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

        //TODO: query for full user details, vendor details, products 

        //Results
        const results = await status === undefined ?
            Order.find({
                vendorId: _id
            }) :
            Order.find({
                vendorId: _id,
                status
            }).lean()

        res(results)
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
        const results = await User.findOne({
            _id
        }).select('cart')

        //Get Products ids from search ids
        const productIds = results.cart.map(searchId => searchUtil.productId(searchId))

        //Get Products
        const results2 = await productServices.getProductsById(productIds)

        res(results2.results.length === 0 ? 'No Products in cart' : results2.results)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

export default services