document.addEventListener('DOMContentLoaded', () => {
    console.log('Jal website loaded');
});

document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    function addToCart(event) {
        const button = event.target;
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingProductIndex = cart.findIndex(item => item.name === productName);
        
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            const product = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} added to cart`);
    }
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the search query
    const query = document.getElementById('search-query').value.trim();

    // Redirect to the search results page with the query
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
});