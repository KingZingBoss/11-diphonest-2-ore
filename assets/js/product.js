document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('mainContent');

    // Get product ID from query string
    const productId = new URLSearchParams(window.location.search).get('id');

    const showProductPage = (product) => {
        mainContent.innerHTML = `
            <div id="productDetail">
                <img src="${product.image}" alt="${product.name}" />
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <div id="quantityControls">
                    <label for="quantity">Quantity:</label>
                    <input type="range" id="quantitySlider" min="1" max="10000" value="1">
                    <input type="number" id="quantityInput" min="1" max="10000" value="1">
                </div>
                <button id="addToCartButton">Add to Cart</button>
            </div>
        `;

        const quantitySlider = document.getElementById('quantitySlider');
        const quantityInput = document.getElementById('quantityInput');

        // Synchronize slider and input
        const synchronizeQuantity = (value) => {
            quantitySlider.value = value;
            quantityInput.value = value;
        };

        quantitySlider.addEventListener('input', () => {
            synchronizeQuantity(quantitySlider.value);
        });

        quantityInput.addEventListener('input', () => {
            synchronizeQuantity(quantityInput.value);
        });

        // Add product to cart
        document.getElementById('addToCartButton').addEventListener('click', () => {
            addToCart(product, quantityInput.value);
        });
    };

    const addToCart = (product, quantity) => {
        if (!window.netlifyIdentity.currentUser()) {
            alert('Please log in to add items to the cart.');
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += parseInt(quantity);
        } else {
            cart.push({ ...product, quantity: parseInt(quantity) });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    };

    // Fetch product data
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (product) {
                showProductPage(product);
            } else {
                mainContent.innerHTML = '<h1>Product not found</h1>';
            }
        });
});
