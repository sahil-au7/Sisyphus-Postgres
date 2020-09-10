import schema from '../schema/vendorSchema'
import PgInterface from '../interfaces/PgInterface';

class Vendor extends PgInterface {
  constructor(data) {
    super(data, schema)
  }
}

export default Vendor