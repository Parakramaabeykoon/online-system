import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  productID: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  altName: {
    type: [String],
    default: [],
    required: true
  },

  discription: {
    type: String,
    required: true
  },
  Image: {
    type: [String],
    default: [],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  labalPrice: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  }

})

const product = mongoose.model("Product", productSchema);
export default product;