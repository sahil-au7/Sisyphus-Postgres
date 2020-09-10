import Vendor from '../models/vendorModel'
import Product from '../models/productModel'
import searchUtil from '../utilities/searchUtil'
import algolia from '../config/algolia'
import searchService from '../services/searchService'
import {
    Schema,
    Types
} from 'mongoose'

const services = {}

//Add Products to algolia
services.addProductToAlgolia = req => new Promise(async (res, rej) => {
    try {
        //Add product
        const product = await (new Product({
            ...req.body
        })).save()

        //Add product to algolia
        await algolia.saveObject(product, {
            'autoGenerateObjectIDIfNotExist': true
        })

        res(product)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Add Products to vendor
services.addProducts = (req) => new Promise(async (res, rej) => {
    try {
        //Get vendor _id
        const _id = req._id

        //Get all the product ids
        let productIds = typeof req.body.productId === "string" ? [req.body.productId] : req.body.productId

        //Get products from algolia
        let products = await services.getProductsById(productIds)

        products = products.results.map(p => {
            const obj = {
                name: p.name,
                price: p.price,
                brand: p.brand,
                vendor_id: _id
            }
            return obj
        })

        // //Create new products
        const product = await Product.insertMany(products).exec()

        res(product)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Get all products in vendor's inventory
services.getInventory = req => new Promise(async (res, rej) => {
    try {
        //Get Vendor id 
        const _id = req._id

        //Get products from db
        const products = await Product.find({
                vendor_id: _id
            })
            .exec()

        res(products.length === 0 ? 'No products in inventory' : products)
    } catch (error) {
        console.log(error)
        rej(error)
    }
})

//Vendor delete products from inventory 
services.deleteProduct = req => new Promise(async (res, rej) => {
    try {
        //Get product id
        const {
            productId
        } = req.params

        //Get products from db
        const results = await Product.deleteOne({
            _id: productId
        }).exec()

        res(results)

    } catch (error) {
        console.log(error)
        rej(error)
    }
})

//Get one Product by id from algolia
services.getProductById = id => new Promise(async (res, rej) => {
    try {
        const product = await algolia.getObject()

        res(product)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

/**
 * Get Multiple Products from algolia
 * 
 * @param ids array of ids
 */
services.getProductsById = ids => new Promise(async (res, rej) => {
    try {
        const products = await algolia.getObjects(ids)

        res(products)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

export default services;