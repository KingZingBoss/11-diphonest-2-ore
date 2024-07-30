// Initialize Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.init();
}

document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('homeLink');
    const loginLink = document.getElementById('loginLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const cartLink = document.getElementById('cartLink');
    const logoutButton = document.getElementById('logoutButton');
    const mainContent = document.getElementById('mainContent');

    // Check if user is logged in
    const checkUser = () => {
        const user = window.netlifyIdentity.currentUser();
        updateAuthUI(user);
    };

    // Update UI based on user authentication status
    const updateAuthUI = (user) => {
        if (user) {
            loginLink.style.display = 'none';
            dashboardLink.style.display = 'inline';
            cartLink.style.display = 'inline';
            logoutButton.style.display = 'inline';
            showHomePage();
        } else {
            loginLink.style.display = 'inline';
            dashboardLink.style.display = 'none';
            cartLink.style.display = 'none';
            logoutButton.style.display = 'none';
            showHomePage();
        }
    };

    // Show Home Page content
    const showHomePage = () => {
        mainContent.innerHTML = `
            <h1>Welcome to Digital Products</h1>
            <div class="product-list" id="productList"></div>
        `;
        fetchProducts();
    };

    // Fetch and display products on the home page
    const fetchProducts = () => {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const productList = document.getElementById('productList');
                productList.innerHTML = '';
                products.forEach(product => {
                    productList.innerHTML += `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}" />
                            <h2>${product.name}</h2>
                            <button onclick="location.href='product.html?id=${product.id}'">View Details</button>
                        </div>
                    `;
                });
            });
    };

    // Handle login process
    const handleLogin = () => {
        window.netlifyIdentity.open();
    };

    // Handle logout process
    const handleLogout = () => {
        window.netlifyIdentity.logout();
    };

    // Event listeners
    homeLink.addEventListener('click', showHomePage);
    loginLink.addEventListener('click', handleLogin);
    logoutButton.addEventListener('click', handleLogout);

    // Listen for login and logout events
    window.netlifyIdentity.on('login', user => {
        updateAuthUI(user);
        window.netlifyIdentity.close();
    });

    window.netlifyIdentity.on('logout', () => {
        updateAuthUI(null);
    });

    // Initial user check
    checkUser();
});
