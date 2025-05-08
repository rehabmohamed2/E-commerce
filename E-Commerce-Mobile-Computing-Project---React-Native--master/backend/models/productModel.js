const mongoose = require('mongoose');
const setAisle = require('../middleware/productMiddleWare/setAisle');
const setItem_ID = require('../middleware/productMiddleWare/setItemID');

const productSchema = new mongoose.Schema({
    // Required Fields
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ask Ai team
        index: true
    },
    item_id: {
        type: String,
        trim: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
    },
    barcode: {
        type: String,
        default: '',
        trim: true,
        unique: true
    },

    // Optional Fields with Defaults and Other Properties
    image: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/black-icon-open-cardboard-box-receive-your-order_124715-2429.jpg',
        trim: true,
        // required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    aisle: {
        type: String,
    },
    // Rating, Inventory, and Sales Information
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: true
    },
    inventory: {
        type: Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

productSchema.pre('save', setItem_ID);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
