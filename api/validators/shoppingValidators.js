import {
    check,
    body,
    param
} from 'express-validator'
import User from '../models/userModel'
import Address from '../models/addressModel'
import Order from '../models/orderModel'
import Error from '../errorHandlers/CustomError'
import Status from '../enums/orderEnum'
import nextStatus from '../utilities/shoppingUtil'

const validators = {}

//Search
validators.search = [
    check('search').isString(),
    check('lat').isNumeric(),
    check('lng').isNumeric(),
    check('radius').isNumeric()
]

//Checkout
validators.checkout = [
    //Check if user provided delivery address and check if cart is empty
    param('addressId').custom((val, {
        req
    }) => new Promise(async (res, rej) => {
        try {

            //Check if user has items in the cart       
            const user = User.findOne({
                    _id: req._id
                })
                .select('-address')
                .select('cart')

            //Check if the current address exist in the user database
            const address = Address.findOne({
                _id: val
            })

            const results = await Promise.all([user, address])

            //If there are no products in cart throw an error
            if (results[0].cart.length === 0) throw new Error(404, 'Cart cannot be empty')

            //Check if the address provided by the user exists
            if (!results[1]) throw new Error(404, 'No Address Found')

            res()
        } catch (e) {
            console.log(e)
            rej(e)
        }
    }))
]

//Cancel Order
validators.cancel = [
    param('orderId').custom(val => new Promise(async (res, rej) => {
        try {
            //Check if the order id is valid
            const results = await Order.findOne({
                _id: val
            })

            //Check if order exists
            if (!results) throw new Error(404, 'No Order Found')

            //Check if orders is delivered, as user can't cancel a devlivered order
            if (results.status === Status.DELIVERED) throw new Error(422, 'Order already delivered')

            //Check if order is already cancelled
            if (results.status === Status.CANCELLED) throw new Error(422, 'Order already cancelled')

            res()
        } catch (e) {
            console.log(e)
            rej(e)
        }
    }))
]

//Vendor actions
validators.vendorAction = [

    param('action').custom((action, {
        req
    }) => new Promise(async (res, rej) => {
        try {
            //Get order id
            const {
                orderId
            } = req.params

            //Check if the order id is valid
            const order = await Order.findOne({
                _id: orderId
            })

            //Check if order exists
            if (order === null) throw new Error(404, 'No Order Found')

            //Check if order is cancelled
            if(order.status === Status.CANCELLED) throw new Error(422 , 'Order is cancelled by the user')

            //Check if actions is [Status.CANCELLED] as vendor can't cancel order
            if(action === Status.CANCELLED) throw new Error(422 , 'Cannot cancel order')

            /**
             Get next order status in the status chain.
             If the action provided by the vendor matches the next status,
             then vendor action is valid else throw an error
             */
            if (nextStatus(order.status) !== action) throw new Error(422, `Invalid action. Order is ${order.status}`)

            res()
        } catch (e) {
            console.log(e)
            rej(e)
        }
    }))
]

export default validators