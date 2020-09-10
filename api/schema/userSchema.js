import Sequelize from "sequelize";
import Address from '../schema/addressSchema'
import Cart from '../schema/cartSchema'
import Order from "../schema/orderSchema";

const User = db.define("users", {
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
    unique: true,
    isEmail: true
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
    defaultValue: false
  }
})

// User.sync({
//   force: true
// })

export default User