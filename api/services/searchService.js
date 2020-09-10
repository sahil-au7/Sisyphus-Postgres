/**
 * This file performs text search
 */
import algolia from '../config/algolia'
import searchUtil from '../utilities/searchUtil'
import Vendor from '../models/vendorModel'
import Product from '../models/productModel'
import productService from '../services/productService'
import sequelize from 'sequelize'

const service = {}

//User search 
service.userSearch = (req) => new Promise(async (res, rej) => {
    try {
        //Get searched product and lat lng
        const {
            search,
            radius,
            lat,
            lng
        } = req.body

        const paginate = req.query.page === undefined ? '' : `LIMIT 5 OFFSET ${5*(Number(req.query.page)-1)}`

        //Get vendors in a given radius 
        const results = await db.query(`SELECT vendors._id as vendor_id ,vendors.name as vendor_name,
         contact, email, products.name as product_name, price , brand, products._id as product_id 
         FROM vendors 
         INNER JOIN products 
         ON products.vendor_id = vendors._id 
         WHERE earth_box(ll_to_earth(${lat}, ${lng}), ${Number(radius)}) @> ll_to_earth(lat, lng) 
         AND LOWER(products.name) 
         LIKE LOWER('%${search}%')
         ${paginate}`)

        res(results[0].map(r => {
            r.search_id = searchUtil.object(r.vendor_id, r.product_id)
            return r
        }))
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

//Vendor Product Search
service.vendorSearch = (req) => new Promise(async (res, rej) => {
    try {
        //Get searched product or brand
        const {
            search,
            page
        } = req.query

        //Perform Search
        const results = searchUtil.parse(await algolia.search(search, {
            page: Number(page || 0)
        }))

        res(results)
    } catch (e) {
        console.log(e)
        rej(e)
    }
})

export default service