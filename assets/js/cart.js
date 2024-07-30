document.addEventListener('DOMContentLoaded', function () {
    const cartContent = document.getElementById('cartContent');

    const updateCartUI = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContent.innerHTML = '';

        if (cart.length === 0) {
            cartContent.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach(item => {
            cartContent.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="item-details">
                        <h2>${item.name}</h2>
                        <p>$${item.price}</p>
                        <div class="quantity">
                            <input type="range" min="1" max="10" value="${item.quantity}">
                            <span>${item.quantity}</span>
                        </div>
                    </div>
                </div>
            `;
        });
    };

    updateCartUI();
});
