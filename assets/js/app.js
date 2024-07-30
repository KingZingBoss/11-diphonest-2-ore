document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('homeLink');
    const loginLink = document.getElementById('loginLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const logoutButton = document.getElementById('logoutButton');
    const mainContent = document.getElementById('mainContent');

    // Show Home Page by default
    showHomePage();

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
            <form id="loginForm">
                <label>Email: <input type="email" id="email" required></label><br>
                <label>Password: <input type="password" id="password" required></label><br>
                <button type="submit">Login</button>
            </form>
        `;
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', handleLogin);
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

    function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email === 'user@example.com' && password === 'password') {
            localStorage.setItem('loggedIn', true);
            updateAuthUI(true);
        } else {
            alert('Invalid credentials');
        }
    }

    function handleLogout() {
        localStorage.removeItem('loggedIn');
        updateAuthUI(false);
    }

    function updateAuthUI(isLoggedIn) {
        if (isLoggedIn) {
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

    updateAuthUI(localStorage.getItem('loggedIn') === 'true');
});
