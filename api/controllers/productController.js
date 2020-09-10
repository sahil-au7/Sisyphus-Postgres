import productService from '../services/productService'
import searchService from '../services/searchService'
import {
    handleErrors
} from '../errorHandlers/ErrorHandlers'

const controller = {}

//Add Product to Algolia
controller.addProduct = async (req, res) => {
    try {
        const product = await productService.addProductToAlgolia(req)

        res.status(201).json(product)
    } catch (e) {
        handleErrors(e, res)
    }
}

export default controller