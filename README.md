# Digital Products E-Commerce Platform

Welcome to the Digital Products E-Commerce Platform, a fully functional single-page application (SPA) built with HTML, CSS, and JavaScript. This platform allows users to browse, purchase, and manage digital products such as e-books, themes, templates, and more.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Browsing Products](#browsing-products)
  - [Adding to Cart](#adding-to-cart)
  - [Viewing Cart](#viewing-cart)
  - [Product Details](#product-details)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Demo

Check out the live demo of the project: [Demo Link](11-diphonest2ore.netlify.app)

## Features

- User authentication and management via Netlify Identity.
- Browse and search through a variety of digital products.
- Add and remove items from the shopping cart.
- Update item quantities directly in the cart.
- View detailed information about each product.
- Persist cart data using `localStorage`.
- Responsive design for seamless use across devices.

## Technologies Used

- **HTML5**: For structuring the application.
- **CSS3**: For styling the application.
- **JavaScript (ES6)**: For adding interactivity and functionality.
- **Netlify Identity**: For authentication and user management.
- **localStorage**: For persisting cart data.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- A code editor like [VS Code](https://code.visualstudio.com/).
- Basic knowledge of HTML, CSS, and JavaScript.
- An active Netlify account for deploying the app and setting up Netlify Identity.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KingZingBoss/digital-products-ecommerce.git
   cd digital-products-ecommerce
   ```

2. **Open the project:**

   Open the project folder in your preferred code editor.

3. **Configure Netlify Identity:**

   - Deploy the site on Netlify and enable Identity.
   - Adjust the settings in your `auth.js` to match your site's configuration.

4. **Start the project:**

   - Open the `index.html` file in your browser to view the application.

## Usage

### Authentication

- **Login/Logout**: Users can log in or log out using the Netlify Identity modal. The UI updates dynamically based on the user's authentication status.

### Browsing Products

- Products are displayed on the home page, fetched from a `products.json` file. Users can view a list of available products and navigate to detailed pages.

### Adding to Cart

- Users can add products to their cart from the product detail page. The cart data is stored in `localStorage`, allowing users to manage their cart across sessions.

### Viewing Cart

- The cart displays all items added by the user, with options to adjust quantities or remove items.

### Product Details

- Each product has a dedicated detail page where users can view more information and add the product to their cart.

## Project Structure

```
digital-products-ecommerce/
│
├── css/
│   ├── styles.css       # Main stylesheet
│
├── js/
│   ├── auth.js          # Authentication logic
│   ├── cart.js          # Shopping cart functionality
│   ├── product.js       # Product detail page logic
│
├── products.json        # Sample product data
├── index.html           # Home page
├── product.html         # Product detail page
├── cart.html            # Shopping cart page
├── README.md            # Project documentation
└── netlify.toml         # Netlify configuration file (if used)
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Netlify Identity](https://www.netlify.com/docs/identity/) for the easy authentication solution.
- [MDN Web Docs](https://developer.mozilla.org/) for comprehensive web development documentation.
