import Sequelize from "sequelize";
import Vendor from '../schema/vendorSchema'
import Cart from '../schema/cartSchema'

const Product = db.define("products", {
    _id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    vendor_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

// Product.sync({
//     force: true
//   })

export default Product