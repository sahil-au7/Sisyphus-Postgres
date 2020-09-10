/**
 * This file contains all the associations.
 * Associations are defined separately in this
 * file as sometimes the models are not created,
 * and hence while referencing, error is throw.
 * Load this file after all the models have been
 * created.
 */
import User from "./userSchema";
import Vendor from "./vendorSchema";
import Address from "./addressSchema";
import Cart from "./cartSchema";
import Order from "./orderSchema";
import Product from "./productSchema";

User.hasMany(Order, {
    foreignKey: 'userId'
})

Order.belongsTo(User, {
    foreignKey: "userId"
})

User.hasMany(Address, {
    foreignKey: 'userId'
})

User.hasOne(Cart, {
    foreignKey: "userId"
})

Address.belongsTo(User, {
    foreignKey: 'userId'
})

Cart.belongsTo(User, {
    foreignKey: "userId"
})

Vendor.hasMany(Product, {
    foreignKey: 'vendor_id'
})

Product.belongsTo(Vendor, {
    foreignKey: 'vendor_id'
})