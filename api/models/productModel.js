import schema from '../schema/productSchema'
import PgInterface from '../interfaces/PgInterface'

class Product extends PgInterface {
    constructor(data) {
        super(data, schema)
    }
}

export default Product