import schema from '../schema/addressSchema'
import PgInterface from '../interfaces/PgInterface'

class Address extends PgInterface {
  constructor(data) {
    super(data, schema)
  }
}

export default Address