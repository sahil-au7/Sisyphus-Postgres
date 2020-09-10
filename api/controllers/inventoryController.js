import productService from "../services/productService";
import searchService from "../services/searchService";
import {
  handleErrors
} from "../errorHandlers/ErrorHandlers";

const controller = {}

//Add Product
controller.addProduct = async (req, res) => {
    try {
      //Add Product
      const product = await productService.addProducts(req);
  
      res.status(201).json(product);
    } catch (e) {
      handleErrors(e, res)
    }
  };
  
  //Vendor Search Products
  controller.searchProducts = async (req, res) => {
    try {
      const products = await searchService.vendorSearch(req);
  
      res.status(201).json(products);
    } catch (e) {
      handleErrors(e, res)
    }
  };
  
  //Get all products in vendor inventory
  controller.getInventory = async (req, res) => {
    try {
      const products = await productService.getInventory(req);
  
      res.status(201).json(products);
    } catch (e) {
      handleErrors(e, res)
    }
  };
  
  //Delete product from inventory
  controller.deleteProduct = async (req, res) => {
    try {
      const products = await productService.deleteProduct(req);
  
      res.status(200).json(products);
    } catch (e) {
      handleErrors(e, res)
    }
  };

  export default controller