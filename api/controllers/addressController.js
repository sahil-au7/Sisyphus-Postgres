import addressService from "../services/addressServices";
const controller = {};

controller.addAddress = async (req, res) => {
  try {
    //Add address
    console.log(req._id);
    const address = await addressService.addAddress(req._id, req.body);

    res.status(201).json(address);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

controller.deleteAddress = async (req, res) => {
  try {
    //Delete a address
    const address = await addressService.deleteAddress(req.params);

    res.status(201).json(address);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

controller.updateAddress = async (req, res) => {
  try {
    //Update a address
    const address = await addressService.updateAddress(req);

    res.status(201).json(address);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default controller;
