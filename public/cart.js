document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const searchForm = document.getElementById('search-form');
    const cartBadge = document.getElementById('cart-badge');
    const cartCount = document.getElementById('cart-count');
    const searchInput = document.getElementById('cart-search-query'); // Ensure this ID is correct

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update the cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function renderCart(filteredCart = null) {
        const displayCart = filteredCart || cart;
        if (displayCart.length > 0) {
            let cartHTML = '<table><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th></tr>';

            displayCart.forEach((item, index) => {
                const itemSubtotal = item.price * item.quantity;
                cartHTML += `<tr>
                    <td>${item.name}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        ${item.quantity}
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </td>
                    <td>₹${itemSubtotal.toFixed(2)}</td>
                </tr>`;
            });

            cartHTML += '</table>';
            cartItemsContainer.innerHTML = cartHTML;

            const subtotal = displayCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
            cartTotal.textContent = `₹${subtotal.toFixed(2)}`;

            document.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', changeQuantity);
            });

            document.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', changeQuantity);
            });
        } else {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartSubtotal.textContent = '₹0.00';
            cartTotal.textContent = '₹0.00';
        }

        updateCartCount();
    }

    function changeQuantity(event) {
        const button = event.target;
        const index = button.dataset.index;
        if (button.classList.contains('decrease-quantity')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (button.classList.contains('increase-quantity')) {
            cart[index].quantity++;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function searchCartItems(event) {
        event.preventDefault(); // Prevent form submission
        const searchQuery = searchInput.value.toLowerCase();
        const filteredCart = cart.filter(item => item.name.toLowerCase().includes(searchQuery));
        renderCart(filteredCart);
    }

    window.searchCartItems = searchCartItems;

    window.openBillingForm = function() {
        window.open('billing.html', '_blank');
    };

    // Handle search form submission
    searchForm.addEventListener('submit', searchCartItems);

    renderCart();

    // Clear the cart
    function clearCart() {
        cart = [];
        localStorage.removeItem('cart');
        renderCart();
    }

    // Checkout process
    function checkout() {
        window.location.href = 'billing.html'; // Redirect to the billing page
    }

    // Attach event listeners
    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});
