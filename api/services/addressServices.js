import Address from "../models/addressModel";
import User from "../models/userModel";

const services = {};

//Get user address
services.getAddress = req => new Promise(async (res, rej) => {
  try {
    //Get user _id
    const _id = req._id

    const addresses = await Address.find({
      userId: _id
    }).exec()

    res(addresses.length === 0 ? 'No Address Found' : addresses)
  } catch (error) {
    console.log(error)
    rej(error)
  }
})

//ADD ADDRESS
services.addAddress = req =>
  new Promise(async (res, rej) => {
    try {
      const userId = req._id
      const data = req.body

      const address = await new Address({
          userId,
          ...data
        })
        .save()

      res(address);
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

//DELETE ADDRESS
services.deleteAddress = req =>
  new Promise(async (res, rej) => {
    try {
      const {
        id
      } = req.params

      const address = await Address.deleteOne({
        _id: id
      }).exec()

      res(address);
    } catch (e) {
      console.log(e);
      rej(e);
    }
  })

//UPDATE ADDRESS
services.updateAddress = req =>
  new Promise(async (res, rej) => {
    try {
      const {
        id
      } = req.params

      const data = req.body

      const address = await Address.findOneAndUpdate({
          _id: id
        }, {
          $set: {
            ...data
          }
        }, {
          new: true,
        })
        .exec()

      res(address);
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

export default services;