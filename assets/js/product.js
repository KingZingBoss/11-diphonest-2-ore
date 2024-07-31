document.addEventListener('DOMContentLoaded', function () {
    const productId = new URLSearchParams(window.location.search).get('id');
    const productContainer = document.getElementById('productContainer');

    // Fetch product data from products.json
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (product) {
                displayProduct(product);
            }
        });

    function displayProduct(product) {
        productContainer.innerHTML = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" />
            <p>${product.description}</p>
            <p>₦${product.price.toFixed(2)}</p>
            <input type="number" id="quantityInput" value="1" min="1">
            <button id="addToCartButton">Add to Cart</button>
            <button id="removeFromCartButton" style="display:none;">Remove from Cart</button>
        `;

        document.getElementById('addToCartButton').addEventListener('click', function () {
            addToCart(product);
        });

        document.getElementById('removeFromCartButton').addEventListener('click', function () {
            removeFromCart(product.id);
        });

        // Check if the product is already in the cart and show/remove the button accordingly
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const inCart = cart.some(item => item.id === product.id);
        if (inCart) {
            document.getElementById('addToCartButton').style.display = 'none';
            document.getElementById('removeFromCartButton').style.display = 'inline';
        }
    }

    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();

        // Update the button display
        document.getElementById('addToCartButton').style.display = 'inline';
        document.getElementById('removeFromCartButton').style.display = 'none';
    }

    function updateCartUI() {
        // Optional: Implement a function to update the cart icon or cart page
    }
});
