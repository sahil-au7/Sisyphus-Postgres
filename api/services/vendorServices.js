import Vendor from "../models/vendorModel";
import encryptionService from "../services/encryptionService";
import jwt from "../services/authorizationService";
import productServices from "../services/productService";
import sendEmail from "../utilities/email";

const services = {};

//Signup
services.signup = (data) =>
  new Promise(async (res, rej) => {
    try {
      //Get Password and hash it
      const {
        lat,
        lng,
        password,
        ...remData
      } = data;

      //Get hash
      const hash = await encryptionService.encrypt(password);

      const vendor = await new Vendor({
        location: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
        password: hash,
        ...remData,
        isLoggedIn: true
      }).save();

      //Generate Token
      const token = await jwt.generate(vendor);

      const message = `Welcome to Sisyphus Family,${vendor.name} !\nThanks for creating a account at Sisyphus.\nPlease take a look at our Services we have made selling products online way more simpler. `;
      await sendEmail({
        email: vendor.email,
        subject: "Welcome to Sisyphus Family ! 😊",
        message,
      });

      res({
        vendor,
        token,
      });
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

//Login
services.login = req =>
  new Promise(async (res, rej) => {
    try {
      //Get id
      const {
        email
      } = req.body;

      const vendor = await Vendor.findOneAndUpdate({
        email,
      }, {
        $set: {
          login_at: Date.now(), //Update login_at,
          isLoggedIn: true //Update isLoggedIn flag
        },
      }, {
        runValidators: true,
        new: true,
      })

      //Generate Token
      const token = await jwt.generate(vendor);

      res({
        vendor,
        token,
      });
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

//Vendor Details
services.details = (req) =>
  new Promise(async (res, rej) => {
    try {
      //Get _id from req
      const _id = req._id;

      //Get query parameter
      const {
        p
      } = req.query;

      //Find vendor without products
      const vendor = await Vendor.findOne({
        _id,
      }).lean(); //Get plain object

      //If vendor has opted to get product details, fetch the products from algolia
      if (p === "1") {
        const products = await productServices.getProductsById(vendor.products);
        vendor.products = products.results;
      } else {
        //Remove products
        delete vendor.products;
      }

      res(vendor);
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });

//Update vendor
services.update = (req) =>
  new Promise(async (res, rej) => {
    try {
      //Update
      const vendor = await Vendor.findOneAndUpdate({
        _id: req._id,
      }, {
        $set: req.body,
      }, {
        runValidators: true,
        new: true,
      });

      res(vendor);
    } catch (error) {
      console.log;
      rej(error);
    }
  });

export default services;