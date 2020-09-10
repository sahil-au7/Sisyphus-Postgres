import Sequelize from "sequelize";

const Cart = db.define('carts', {
    _id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    searchId: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Cart.sync({
//     force: true
//   })

export default Cart