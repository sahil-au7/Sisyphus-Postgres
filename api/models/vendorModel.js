import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  contact: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  gstin: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 12,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  login_at: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [Number],
    },
  },
  products: [{
    type: String,
  }],
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
});

//Add indexing
vendorSchema.index({
  location: "2dsphere",
});

export default new mongoose.model("Vendor", vendorSchema);