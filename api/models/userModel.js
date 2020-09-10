import schema from '../schema/userSchema'
import PgInterface from '../interfaces/PgInterface'

class User extends PgInterface {
  constructor(data) {
    super(data, schema)
  }
}

export default User