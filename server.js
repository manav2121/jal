const express = require("express")
const path = require("path")
const app = express()

const port = process.env.PORT || 3000
app.use(express.json())
const Product = require('./order.js'); 
const dbURI = 'mongodb+srv://manavkashyap6708:gipyqKLA5RuVRnYO@cluster0.asb2esb.mongodb.net/myCartDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
app.use(express.urlencoded({ extended: false }))


app.post('/checkout', async (req, res) => {
    try {
        const { items, subtotal, total } = req.body;

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


app.listen(port, () => {
    console.log('port connected');
})