import mongoose from 'mongoose';

const addressModel = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'home',
    enum: ['home', 'work'],
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: 'India',
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
    },
  },
});

export default new mongoose.model('address', addressModel);
