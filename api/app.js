import '@babel/polyfill';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env'
});
import express from "express";
import morgan from "morgan";
import {
  handleGlobalErrors
} from './errorHandlers/ErrorHandlers';

//Connect to database
require('./config/db_sql')

//import routes
const routes = require("./routes/index").default

//Create an instance of express app
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("dev"));
app.use("/", routes);
app.use("/", handleGlobalErrors);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`CONNECTED TO : ${port}`);
})