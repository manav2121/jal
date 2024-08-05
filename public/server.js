const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); // Import mongoose
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define your Product model here or import it if it is in a separate file
const Product = require('./order.js'); 

// MongoDB connection URI
const dbURI = 'mongodb+srv://manav:kashyap@cluster0.zd5ftkm.mongodb.net/';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// POST route for checkout
app.post('/checkout', async (req, res) => {
    try {
        const { items, subtotal, total } = req.body;

        // Validate request body
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items provided' });
        }

        // Loop through items and save them to the database
        for (const item of items) {
            const product = new Product({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity
            });

            await product.save();
        }

        // Respond to the client
        res.json({ success: true });
    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ success: false, message: 'An error occurred during checkout.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
