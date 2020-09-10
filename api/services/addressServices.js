import Address from "../models/addressModel";
import User from "../models/userModel";

const services = {};

//ADD ADDRESS
services.addAddress = (_id, data) =>
  new Promise(async (res, rej) => {
    try {
      const { lat, lng, ...remData } = data;

      const address = await new Address({
        location: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
        ...remData,
      }).save();

      const userAddress = await User.findOneAndUpdate(
        {
          _id,
        },
        {
          $push: {
            address: address,
          },
        }
      );

      res(address);
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

//DELETE ADDRESS
services.deleteAddress = (data) =>
  new Promise(async (res, rej) => {
    try {
      const { id } = data;
      const address = await Address.findByIdAndDelete(id);
      res(address);
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

//UPDATE ADDRESS
services.updateAddress = (req) =>
  new Promise(async (res, rej) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const address = await Address.findByIdAndUpdate(id, data, {
        new: true,
      });
      res(address);
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

export default services;
