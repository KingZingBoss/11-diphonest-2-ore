document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('homeLink');
    const loginLink = document.getElementById('loginLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const logoutButton = document.getElementById('logoutButton');
    const cartLink = document.getElementById('cartLink');
    const mainContent = document.getElementById('mainContent');

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

    const showHomePage = () => {
        mainContent.innerHTML = `
            <h1>Welcome to 11-diphonest-2-ore</h1>
            <div class="product-list" id="productList"></div>
        `;
        fetchProducts();
    };

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

    const handleLogout = () => {
        window.netlifyIdentity.logout();
    };

    window.netlifyIdentity.on('login', (user) => {
        updateAuthUI(user);
        window.netlifyIdentity.close();
    });

    window.netlifyIdentity.on('logout', () => {
        updateAuthUI(null);
    });

    const user = window.netlifyIdentity.currentUser();
    updateAuthUI(user);

    homeLink.addEventListener('click', showHomePage);
    loginLink.addEventListener('click', () => window.netlifyIdentity.open());
    logoutButton.addEventListener('click', handleLogout);
});
