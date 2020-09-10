import Sequelize from "sequelize";
import User from '../schema/userSchema'
import Address from '../schema/addressSchema'
import Product from '../schema/productSchema'
import Vendor from '../schema/vendorSchema'
import Cart from "./cartSchema";

const Order = db.define("orders", {
  _id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  vendorId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  addressId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  productId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  ordered_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})


// Order.sync({
//   force: true
// })

export default Order;