const { default: mongoose } = require("mongoose");
const Customer = require("../models/customerSchema.js");

const isValidID = (id) => mongoose.isValidObjectId(id);

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.json({
      success: true,
      data: customers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const addCustomer = async (req, res) => {
  try {
    const existed = await Customer.findOne({ email: req.body.email });
    if (existed) {
      return res.status(400).json({
        success: false,
        message: "Email already used",
      });
    }
    await Customer.create(req.body);
    res.status(201).json({
      success: true,
      message: "Customer created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCustomer = async (req, res) => {
  if (!isValidID(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.json({
      success: true,
      data: customer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateCustomer = async (req, res) => {
  if (!isValidID(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const updatedCustomer = await Customer.updateOne(
      { _id: req.params.id },
      req.body
    );
    if (updatedCustomer.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.json({
      success: true,
      data: updatedCustomer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  if (!isValidID(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const deletedCustomer = await Customer.deleteOne({ _id: req.params.id });
    if (deletedCustomer.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getAllCustomers,
  addCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
