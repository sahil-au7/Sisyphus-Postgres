import Sequelize from "sequelize"
import User from '../schema/userSchema'

const Address = db.define("addresses", {
  _id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  type: {
    type: Sequelize.ENUM,
    allowNull: false,
    defaultValue: "home",
    values: ["home", "work"],
  },
  address1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "India",
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: User
  }
})

// Address.sync({
//   force: true
// })

export default Address