import {
    check,
    param
} from 'express-validator'
import Error from '../errorHandlers/CustomError'
import Product from '../models/productModel'

const validator = {}

//Add Product Validator
validator.addProduct = [
    check('name').isString(),
    check('description').isString(),
    check('brand').isString(),
    check('price').isNumeric()
]

//Delete product
validator.deleteProducts = [
    //Check if product exists in vendor inventory
    param('productId')
    .custom(prouductId => new Promise(async (res, rej) => {
        try {
            //Get product
            const product = await Product.findOne({
                _id: prouductId
            }).exec()

            //Check product is found or not
            if (!product) throw new Error(404, 'No Product found')

            res()
        } catch (error) {
            console.log(error)
            rej(error)
        }
    }))
]

export default validator