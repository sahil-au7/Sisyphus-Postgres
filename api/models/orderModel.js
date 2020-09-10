import schema from '../schema/orderSchema'
import PgInterface from '../interfaces/PgInterface'

class Order extends PgInterface {
  constructor(data) {
    super(data, schema)
  }
}

export default Order