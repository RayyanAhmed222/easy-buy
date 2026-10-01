import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },

    category: { type: String, required: true },

    // Only really needed for Kids/Juniors
    gender: { type: String },

    subCategory: { type: String, required: true },
    subSubCategory: { type: String, required: true },

    sizes: { type: Array, required: true },
    bestSeller: { type: Boolean },
    date: { type: Number, required: true }
})


const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel