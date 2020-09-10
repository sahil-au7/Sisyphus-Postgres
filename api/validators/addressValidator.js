//Address Validators

import { check, body } from "express-validator";

const validator = {};

validator.address = [
  check("type").isString(),
  check("address1").isString(),
  check("city").isString(),
  check("state").isString(),
  check("lat").isNumeric(),
  check("lng").isNumeric(),
];

export default validator;
