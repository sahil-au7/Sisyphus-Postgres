//Address Validators

import {
  check,
  body,
  param
} from "express-validator";
import Error from '../errorHandlers/CustomError'
import Address from '../models/addressModel'

const validator = {};

//Add Address Validator
validator.addAddress = [
  check("type").isString(),
  check("address1").isString(),
  check("city").isString(),
  check("state").isString(),
];

//Check address validator, check if address exists
validator.checkAddress = [
  param('id').custom(id => new Promise(async (res, rej) => {
    try {
      //Check if address exist
      const address = await Address.findOne({
          _id: id
        })
        .exec()

      if (!address) throw new Error(404, 'No Address Found')
      res()
    } catch (error) {
      rej(error)
    }
  }))
]

export default validator;