import addressService from "../services/addressServices";
import {
  handleErrors
} from '../errorHandlers/ErrorHandlers'

const controller = {};

//Get Address
controller.getAddress = async (req, res) => {
  try {
    //Add address
    console.log(req._id);
    const address = await addressService.getAddress(req);

    res.status(200).json(address);
  } catch (e) {
    console.log(e);
    handleErrors(e, res)
  }
}

//Add Address
controller.addAddress = async (req, res) => {
  try {
    //Add address
    console.log(req._id);
    const address = await addressService.addAddress(req);

    res.status(201).json(address);
  } catch (e) {
    console.log(e);
    handleErrors(e, res)
  }
};

//Delete Addresss
controller.deleteAddress = async (req, res) => {
  try {
    //Delete a address
    const address = await addressService.deleteAddress(req);

    res.status(200).json(address);
  } catch (e) {
    console.log(e);
    handleErrors(e, res)
  }
};

//Update Addresss
controller.updateAddress = async (req, res) => {
  try {
    //Update a address
    const address = await addressService.updateAddress(req);

    res.status(200).json(address);
  } catch (e) {
    console.log(e);
    handleErrors(e, res)
  }
};

export default controller;