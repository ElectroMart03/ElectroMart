import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// CONTROLLER FUNCTION FOR ADDING PRODUCT
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, colors, popular } = req.body;

        // Extracting images if provided
        const images = ["image1", "image2", "image3", "image4"]
            .map(field => req.files?.[field]?.[0])
            .filter(item => item !== undefined);

        // Upload images to Cloudinary or use a default image
        let imagesUrl = images.length > 0
            ? await Promise.all(images.map(async item => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            }))
            : ['https://via.placeholder.com/150'];

        // Create Product Data
        const productData = {
            name,
            description,
            price,
            category,
            popular: popular === "true",
            colors: colors ? JSON.parse(colors) : [],
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// CONTROLLER FUNCTION FOR REMOVING PRODUCT
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// CONTROLLER FUNCTION FOR LISTING PRODUCTS
const listProducts = async (req, res) => {
    
    try {
        const products = await productModel.find({});
        // console.log("Fetched Products:", products); // ✅ Debugging
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// CONTROLLER FUNCTION FOR SINGLE PRODUCT
const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, removeProduct, listProducts, singleProduct };
