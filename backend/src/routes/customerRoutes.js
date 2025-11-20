const express = require("express");
const {
  getAllCustomers,
  addCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers).post(addCustomer);
customerRouter
  .route("/:id")
  .get(getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = customerRouter;
