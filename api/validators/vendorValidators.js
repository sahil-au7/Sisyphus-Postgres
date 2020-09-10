import { check, body } from "express-validator";
import encryptionService from "../services/encryptionService";
import Vendor from "../models/vendorModel";
import Error from "../errorHandlers/CustomError";

const validator = {};

//==========================================Signup Validator==========================================
validator.signup = [
  //Check name
  check("name", "Invalid Name").isString(),

  //Check if email is valid
  check("email", "Invalid Email").isEmail(),

  //Check if email is unique
  body("email")
    .custom(async (email) => {
      const vendor = await Vendor.findOne({
        email,
      });

      if (vendor) {
        throw new Error(409, "Vendor already exists");
      }
    })
    .bail(),

  //Check if GSTIN number is valid
  body("gstin", "Invalid GSTIN").custom((val) => {
    return val.length === 12;
  }),

  //Check if password length is minimum 5 characters
  check("password", "Password must contain at least 5 characters").isLength({
    min: 5,
  }),

  //Check if phone number is valid
  check("contact", "Invalid Phone Number").isMobilePhone(),

  //Check coordinates
  check("lat", "Invalid Latitude").isNumeric(),
  check("lng", "Invalid Longitude").isNumeric(),
];

//==========================================Login Validator==========================================
validator.login = [
  //Check if email is valid
  check("email", "Invalid Email").isEmail(),

  //Check if email is unique
  body("email")
    .custom(async (email) => {
      const vendor = await Vendor.findOne({
        email,
      });

      if (!vendor) {
        throw new Error(409, "Vendor doesn't exists");
      }
    })
    .bail(),

  //Check if password is correct
  body("password").custom(
    (password, { req }) =>
      new Promise(async (res, rej) => {
        try {
          const { email } = req.body;
          //Get vendor related to this email
          //NOTE : Make sure to add .select('password) in the query to get the password field in the returned document
          const vendor = await Vendor.findOne({
            email,
          }).select("password");

          //Check if password is correct
          const isVerified = await encryptionService.verify(
            password,
            vendor.password
          );

          if (isVerified) {
            res();
          } else {
            rej(new Error(401, "Invalid Email or Password"));
          }
        } catch (e) {
          console.log(e);
          rej(e);
        }
      })
  ),
];

//==========================================Update Validator==========================================
validator.update = [
  check("products", "Cannot update products").isEmpty(),
  check("email", "Cannot update email").isEmpty(),
  check("gstin", "Cannot update gstin").isEmpty(),
  check("_id", "Cannot update id").isEmpty(),
  check("created_at", "Cannot update created_at").isEmpty(),
  check("login_at", "Cannot update login_at").isEmpty(),
];

export default validator;
