/**
 * This is routes index file.
 * It contains all the routes.
 */
import express from 'express';
import vendorRoutes from '../routes/vendorRoutes';
import userRoutes from '../routes/userRoutes';
import shoppingRoutes from '../routes/shoppingRoutes'
import addressRoutes from '../routes/addressRoutes'
import productRoutes from '../routes/productRoutes'
import inventoryRoutes from '../routes/inventoryRoutes'
import passwordResetRoutes from './passwordResetRoutes'

import Vendor from '../models/vendorModel'
import User from '../models/userModel'

import authorize from "../middlewares/auth";

const routes = express.Router();

//User Routes
routes.use('/user', userRoutes);

//Shopping routes
routes.use('/user/shop', authorize, shoppingRoutes)

//Address routes
routes.use('/user/address', authorize, addressRoutes)

//User password reset
routes.use('/user/passwordReset', passwordResetRoutes)

//Vendor Routes
routes.use('/vendor', vendorRoutes);

//Vendor Inventory Routes
routes.use('/vendor/inventory', authorize, inventoryRoutes)

//Vendor Password Reset
routes.use('/vendor/passwordReset', passwordResetRoutes)

//============================THIS IS AN ADMIN API ROUTE=====================================
//Add Products to algolia
routes.use('/product', productRoutes)
//============================THIS IS AN ADMIN API ROUTE=====================================

export default routes;