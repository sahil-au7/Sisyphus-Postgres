/**
 * This is model factory class.
 * It create a Model from class name.
 */
import User from '../schema/userSchema'
import Address from '../schema/addressSchema'
import Cart from '../schema/cartSchema'
import Product from '../schema/productSchema'
import Order from '../schema/orderSchema'
import Vendor from '../schema/vendorSchema'

const models = {
    'User': User,
    'Address': Address,
    'Cart': Cart,
    'Product': Product,
    'Order': Order,
    'Vendor': Vendor
}

/**
 * Get model form class name
 */
export default data => models[data.name]