const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Product schema
const productSchema = new Schema({
    Product: {
        type: String,
        required: true,
        trim: true
    },
    Price: {
        type: Number,
        required: true,
        min: 0
    },
    Quantity: {
        type: Number,
        required: true,
        min: 0
    },
    Subtotal: {
        type: Number,
        required: true,
        default: function() {
            return this.price * this.quantity;
        }
    }
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
