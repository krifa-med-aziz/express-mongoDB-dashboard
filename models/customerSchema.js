const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerSchema = new schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minlength: [3, "firstName must be at least 3 characters"],
      maxlength: [50, "firstName cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      minlength: [3, "lastName must be at least 3 characters"],
      maxlength: [50, "lastName cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: (v) => /^[0-9]{8,15}$/.test(v),
        message: "Phone number must be 8–15 digits",
      },
    },
    age: {
      type: Number,
      min: [0, "Age must be a positive number"],
      required: true,
    },
    country: String,
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Gender must be 'male' or 'female'",
      },
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
