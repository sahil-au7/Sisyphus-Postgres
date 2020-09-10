import Sequelize from "sequelize";
import Order from '../schema/orderSchema'
import Product from '../schema/productSchema'

const Vendor = db.define("vendors", {
  _id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    exclude: true
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false,
    len: 10
  },
  gstin: {
    type: Sequelize.STRING,
    allowNull: false,
    len: 12,
    unique: true
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  login_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  passwordResetToken: {
    type: Sequelize.STRING
  },
  passwordResetExpires: {
    type: Sequelize.STRING
  },
  isLoggedIn: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

// Vendor.sync({
//   force: true
// })

export default Vendor