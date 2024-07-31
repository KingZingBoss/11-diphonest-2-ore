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
                <p>₦${product.price.toFixed(2)}</p>
                <div id="quantityControls">
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantityInput" min="1" max="10000" value="1">
                </div>
                <button id="addToCartButton">Add to Cart</button>
                <button id="removeFromCartButton" style="display:none;">Remove from Cart</button>
            </div>
        `;

        const quantityInput = document.getElementById('quantityInput');
        const addToCartButton = document.getElementById('addToCartButton');
        const removeFromCartButton = document.getElementById('removeFromCartButton');

        // Check if the product is already in the cart
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            addToCartButton.style.display = 'none';
            removeFromCartButton.style.display = 'inline';
        } else {
            addToCartButton.style.display = 'inline';
            removeFromCartButton.style.display = 'none';
        }

        // Add product to cart
        addToCartButton.addEventListener('click', () => {
            addToCart(product, quantityInput.value);
        });

        // Remove product from cart
        removeFromCartButton.addEventListener('click', () => {
            removeFromCart(product.id);
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
        showProductPage(product); // Update page to show correct button visibility
    };

    const removeFromCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product removed from cart!');
        showProductPage(products.find(p => p.id == productId)); // Update page to show correct button visibility
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
