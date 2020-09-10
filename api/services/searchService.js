/**
 * This file performs text search
 */
import algolia from '../config/algolia'
import searchUtil from '../utilities/searchUtil'
import Vendor from '../models/vendorModel'
import Product from '../models/productModel'
import productService from '../services/productService'

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

        // //Filter vendors based on user location and radius
        // const vendors = await Vendor.aggregate()
        //     .near({
        //         near: {
        //             type: "Point",
        //             coordinates: [Number(lng), Number(lat)]
        //         },
        //         maxDistance: Number(radius),
        //         spherical: true,
        //         distanceField: "distance"
        //     }) //Select vendors in the given radius
        //     .project('products _id contact name') //Select only name , contact , _id , products
        //     .unwind('products') //Split the products into object containing the vendor details and individal productId

        // //Perform Search
        // const results = searchUtil.parse(await algolia.search(search))

        // // const results = await productService.getProductsById(
        // //     vendors.map(v => v.products)
        // // )

        // // console.log(results)

        // //Get only those products which are present in search
        // const products = vendors.map(vendor => {
        //     //Get all the products this vendor is selling and is searched by the user
        //     let product = results.filter(pdct => pdct.objectID === vendor.products)[0]

        //     return product === undefined ? undefined : searchUtil.object(vendor, product)
        // }).filter(e => e) //Filter undefined

        // console.log(results, vendors)

        // //Filter vendors based on user location and radius
        const vendors = await Vendor.aggregate()
            .near({
                near: {
                    type: "Point",
                    coordinates: [Number(lng), Number(lat)]
                },
                maxDistance: Number(radius),
                spherical: true,
                distanceField: "distance"
            })
            .lookup({
                from: 'products',
                localField: '_id',
                foreignField: 'vendorId',
                as: 'product'
            })
            .project('product -_id name contact')
            .unwind('product')
            .match({
                'product.name': searchUtil.partialTextSearch(search)
            })

        res(vendors.map(e => {
            e.searchId = searchUtil.object(e.product.vendorId, e.product._id)
            return e
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