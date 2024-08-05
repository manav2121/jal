// Add event listeners to 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        addToCart(button.dataset.name, button.dataset.price);
    });
});Z

function addToCart(name, price) {
    // Your logic to add items to the cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-badge');
    if (cart.length > 0) {
        badge.textContent = cart.length;
        badge.classList.add('show');
    } else {
        badge.classList.remove('show');
    }
}

// Call this function on page load
updateCartBadge();
