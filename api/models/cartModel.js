import schema from '../schema/cartSchema'
import PgInterface from '../interfaces/PgInterface'

class Cart extends PgInterface {
  constructor(data) {
    super(data, schema)
  }
}

export default Cart