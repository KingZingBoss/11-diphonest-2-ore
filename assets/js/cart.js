document.addEventListener('DOMContentLoaded', function () {
    const cartContent = document.getElementById('cartContent');

    // Fetch product data from products.json
    const fetchProductData = async () => {
        const response = await fetch('products.json');
        return response.json();
    };

    // Function to update the cart UI
    const updateCartUI = async () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const products = await fetchProductData(); // Fetch updated product data
        const productMap = products.reduce((map, product) => {
            map[product.id] = product;
            return map;
        }, {});
        cartContent.innerHTML = '';

        if (cart.length === 0) {
            cartContent.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            const product = productMap[item.id] || {};
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            cartContent.innerHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${product.image || ''}" alt="${product.name || 'Unknown Product'}" />
                    <div class="item-details">
                        <h2>${product.name || 'Unknown Product'}</h2>
                        <p>₦${item.price.toFixed(2)}</p>
                        <div class="quantity-controls">
                            <button class="minus-button">-</button>
                            <input type="number" class="quantity-input" min="1" value="${item.quantity}">
                            <input type="range" class="quantity-slider" min="1" max="100" value="${item.quantity}">
                            <button class="plus-button">+</button>
                        </div>
                        <p>Total: ₦${itemTotal.toFixed(2)}</p>
                        <button class="remove-button">Remove</button>
                    </div>
                </div>
            `;
        });

        // Calculate totals
        const tax = subtotal * 0.10;
        const finalTotal = subtotal + tax;

        cartContent.innerHTML += `
            <div class="cart-totals">
                <p>Subtotal: ₦${subtotal.toFixed(2)}</p>
                <p>Tax (10%): ₦${tax.toFixed(2)}</p>
                <p><strong>Final Total: ₦${finalTotal.toFixed(2)}</strong></p>
            </div>
        `;

        // Attach event listeners to newly created buttons and inputs
        attachEventListeners();
    };

    // Function to attach event listeners to buttons and inputs
    const attachEventListeners = () => {
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
            input.addEventListener('input', handleQuantityChange);
        });

        document.querySelectorAll('.quantity-slider').forEach(slider => {
            slider.addEventListener('input', handleSliderChange);
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

    // Function to handle quantity input change
    const handleQuantityChange = (event) => {
        const cartItem = event.target.closest('.cart-item');
        const itemId = cartItem.getAttribute('data-id');
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            updateCartItemQuantity(itemId, newQuantity - getCurrentQuantity(itemId));
        } else {
            event.target.value = getCurrentQuantity(itemId); // Revert to the current quantity if invalid
        }
    };

    // Function to handle slider change
    const handleSliderChange = (event) => {
        const cartItem = event.target.closest('.cart-item');
        const itemId = cartItem.getAttribute('data-id');
        const slider = event.target;
        const newQuantity = parseInt(slider.value, 10);
        updateCartItemQuantity(itemId, newQuantity - getCurrentQuantity(itemId));
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
            const newQuantity = cart[itemIndex].quantity + change;
            if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
            } else {
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
