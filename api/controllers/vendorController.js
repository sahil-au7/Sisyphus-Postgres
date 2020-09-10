import Vendor from '../models/vendorModel'
import vendorService from "../services/vendorServices";
import productService from "../services/productService";
import searchService from "../services/searchService";
import shoppingService from "../services/shoppingServices";
import passwordResetService from '../services/passwordResetService'
import logout from '../services/logoutService'
import {
  handleErrors
} from "../errorHandlers/ErrorHandlers";

const controller = {};

//Vendor Signup
controller.signup = async (req, res) => {
  try {
    //Create new vendor
    const vendor = await vendorService.signup(req.body);

    res.status(201).json(vendor);
  } catch (e) {
    handleErrors(e, res)
  }
};

//Vendor Login
controller.login = async (req, res) => {
  try {
    //Login vendor
    const vendor = await vendorService.login(req);

    res.status(201).json(vendor);
  } catch (e) {
    handleErrors(e, res)
  }
};

//Get Vendor details
controller.getDetails = async (req, res) => {
  try {
    const vendor = await vendorService.details(req);

    res.status(200).json(vendor);
  } catch (e) {
    handleErrors(e, res)
  }
};

//Get All orders
controller.getOrders = async (req, res) => {
  try {
    //Checkout
    const results = await shoppingService.getVendorOrders(req);

    res.status(200).json(results);
  } catch (e) {
    handleErrors(e, res)
  }
};

//Accept/Cancel/Delivered order
controller.action = async (req, res) => {
  try {
    //Checkout
    const results = await shoppingService.vendorAction(req);

    res.status(200).json(results);
  } catch (e) {
    handleErrors(e, res)

  }
};

//Update vendor profile
controller.update = async (req, res) => {
  try {
    //Update
    const results = await vendorService.update(req);

    res.status(200).json(results);
  } catch (error) {
    handleErrors(e, res)
  }
};

//Forgot Password
controller.forgotPassword = async (req, res) => {
  try {
    const vendor = await passwordResetService.forgotPassword(Vendor, req);

    res.status(201).json(vendor);
  } catch (e) {
    handleErrors(e, res)
  }
};

//Reset Password
controller.resetPassword = async (req, res) => {
  try {
    const message = await passwordResetService.resetPassword(Vendor, req);

    res.status(201).json(message);
  } catch (e) {
    handleErrors(e, res)
  }
};

//Logout
controller.logout = async (req, res) => {
  try {
    const message = await logout(Vendor, req)

    res.status(200).json(message)
  } catch (e) {
    handleErrors(e, res)
  }
}

export default controller;