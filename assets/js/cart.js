document.addEventListener('DOMContentLoaded', function () {
    const cartContent = document.getElementById('cartContent');

    // Function to update the cart UI
    const updateCartUI = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContent.innerHTML = '';

        if (cart.length === 0) {
            cartContent.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach(item => {
            cartContent.innerHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="item-details">
                        <h2>${item.name}</h2>
                        <p>$${item.price}</p>
                        <div class="quantity-controls">
                            <button class="minus-button">-</button>
                            <input type="number" class="quantity-input" min="1" value="${item.quantity}">
                            <button class="plus-button">+</button>
                        </div>
                        <button class="remove-button">Remove</button>
                    </div>
                </div>
            `;
        });

        // Add event listeners for the newly added elements
        document.querySelectorAll('.plus-button').forEach(button => {
            button.addEventListener('click', handlePlusClick);
        });

        document.querySelectorAll('.minus-button').forEach(button => {
            button.addEventListener('click', handleMinusClick);
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', handleRemoveClick);
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', handleQuantityChange);
        });
    };

    // Function to handle the plus button click
    const handlePlusClick = (event) => {
        const cartItem = event.target.closest('.cart-item');
        const itemId = cartItem.getAttribute('data-id');
        updateCartItemQuantity(itemId, 1);
    };

    // Function to handle the minus button click
    const handleMinusClick = (event) => {
        const cartItem = event.target.closest('.cart-item');
        const itemId = cartItem.getAttribute('data-id');
        updateCartItemQuantity(itemId, -1);
    };

    // Function to handle quantity change input
    const handleQuantityChange = (event) => {
        const cartItem = event.target.closest('.cart-item');
        const itemId = cartItem.getAttribute('data-id');
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            updateCartItemQuantity(itemId, newQuantity - getCurrentQuantity(itemId));
        }
    };

    // Function to handle remove button click
    const handleRemoveClick = (event) => {
        const cartItem = event.target.closest('.cart-item');
        const itemId = cartItem.getAttribute('data-id');
        removeCartItem(itemId);
    };

    // Helper function to get current quantity of an item
    const getCurrentQuantity = (itemId) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(cartItem => cartItem.id === itemId);
        return item ? item.quantity : 0;
    };

    // Function to update cart item quantity
    const updateCartItemQuantity = (itemId, change) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    };

    // Function to remove an item from the cart
    const removeCartItem = (itemId) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(cartItem => cartItem.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateCartUI();
    };

    // Initial call to update the cart UI
    updateCartUI();
});
