// Initialize Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.init();
}

document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('homeLink');
    const loginLink = document.getElementById('loginLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const logoutButton = document.getElementById('logoutButton');
    const mainContent = document.getElementById('mainContent');

    // Initialize Netlify Identity and check user state
    const user = window.netlifyIdentity.currentUser();
    updateAuthUI(user);

    homeLink.addEventListener('click', showHomePage);
    loginLink.addEventListener('click', showLoginPage);
    dashboardLink.addEventListener('click', showDashboardPage);
    logoutButton.addEventListener('click', handleLogout);

    function showHomePage() {
        mainContent.innerHTML = `
            <h1>Welcome to Digital Products</h1>
            <div class="product-list" id="productList"></div>
        `;
        fetchProducts();
    }

    function showLoginPage() {
        mainContent.innerHTML = `
            <h1>Login</h1>
            <button id="loginButton">Login with Netlify</button>
        `;
        document.getElementById('loginButton').addEventListener('click', handleLogin);
    }

    function showDashboardPage() {
        mainContent.innerHTML = `
            <h1>Dashboard</h1>
            <div id="userProducts"></div>
        `;
        fetchUserProducts();
    }

    function fetchProducts() {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const productList = document.getElementById('productList');
                products.forEach(product => {
                    productList.innerHTML += `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}" />
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p>$${product.price}</p>
                            <button onclick="location.href='product.html?id=${product.id}'">View Details</button>
                        </div>
                    `;
                });
            });
    }

    function fetchUserProducts() {
        // Placeholder function for fetching user-specific products
        document.getElementById('userProducts').innerHTML = `<p>Feature coming soon!</p>`;
    }

    function handleLogin() {
        window.netlifyIdentity.open();
    }

    function handleLogout() {
        window.netlifyIdentity.logout();
    }

    function updateAuthUI(user) {
        if (user) {
            loginLink.style.display = 'none';
            dashboardLink.style.display = 'inline';
            logoutButton.style.display = 'inline';
            showDashboardPage();
        } else {
            loginLink.style.display = 'inline';
            dashboardLink.style.display = 'none';
            logoutButton.style.display = 'none';
            showHomePage();
        }
    }

    // Listen for login and logout events
    window.netlifyIdentity.on('login', user => {
        updateAuthUI(user);
        window.netlifyIdentity.close();
    });

    window.netlifyIdentity.on('logout', () => {
        updateAuthUI(null);
    });
});
