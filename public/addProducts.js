const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }  // URL to the product image
});

const Product = mongoose.model('Product', productSchema);

const products = [
    { name: 'Mineral Water', description: 'Pure mineral water', price: 1, image: '/images/mineral_water.jpg' },
    { name: 'Spring Water', description: 'Natural spring water', price: 1.5, image: '/images/spring_water.jpg' },
    { name: 'Distilled Water', description: 'High-quality distilled water', price: 2, image: '/images/distilled_water.jpg' }
];

Product.insertMany(products)
    .then(() => {
        console.log('Products added');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error adding products:', error);
    });
    