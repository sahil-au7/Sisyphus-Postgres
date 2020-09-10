/**
 * This utility cleans the search results from algolia
 */

const searchUtil = {}

//Parse the Algolia searched results
searchUtil.parse = results => results.hits.map(element => {
    const elem = JSON.parse(JSON.stringify(element))
    delete elem._highlightResult
    return elem
})

//Create search Object
searchUtil.object = (vendorId, productId) => `${vendorId}_${productId}`

//Get Vendor id from search id
searchUtil.vendorId = searchId => searchId.split('_')[0]

//Get product id from search id
searchUtil.productId = searchId => searchId.split('_')[1]

//Fuzzy search / Partial text search
searchUtil.partialTextSearch = text => {
    const escapeRegex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")

    const regex = new RegExp(escapeRegex, 'gi') //Flags : global , ignore case

    return regex
}

export default searchUtil