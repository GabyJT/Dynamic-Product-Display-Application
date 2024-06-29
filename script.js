document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://course-api.com/react-store-products'; // API endpoint for product data
    let products = []; // Array to store product data
    let currentIndex = 0; // Index to track current product

    // References to DOM elements
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productDisplayElement = document.getElementById('product-display');
    const productImageElement = document.getElementById('product-image');
    const productNameElement = document.getElementById('product-name');
    const productDescriptionElement = document.getElementById('product-description');
    const productPriceElement = document.getElementById('product-price');

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Function to display product information
    function showProduct(index) {
        if (products.length === 0) return; // Exit if no products

        const product = products[index];
        productImageElement.src = product.image || ''; // Set image source, fallback to empty string
        productNameElement.textContent = product.name || 'No Name'; // Fallback text
        productDescriptionElement.textContent = product.description || 'No Description'; // Fallback text
        productPriceElement.textContent = `$${product.price ? product.price.toFixed(2) : '0.00'}`; // Fallback text
    }

    // Function to fetch products from the API
    function fetchProducts() {
        loadingElement.style.display = 'block'; // Show loading indicator
        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Throw error if response is not OK
                }
                return response.json(); // Parse response as JSON
            })
            .then(data => {
                products = data; // Store data in products array
                console.log('Fetched products:', products); // Log products data
                if (products.length > 0) {
                    showProduct(currentIndex); // Display the first product
                    loadingElement.style.display = 'none'; // Hide loading indicator
                } else {
                    errorElement.textContent = 'No products found.'; // Show error message
                    loadingElement.style.display = 'none'; // Hide loading indicator
                }
            })
            .catch(error => {
                errorElement.textContent = `Error fetching data: ${error.message}`; // Show error message
                loadingElement.style.display = 'none'; // Hide loading indicator
                console.error('Error fetching data:', error); // Log error details
            });
    }

    // Function to update the index of the current product
    function updateProductIndex(increment) {
        currentIndex = (currentIndex + increment + products.length) % products.length; // Update index and handle wrap-around
        showProduct(currentIndex); // Show the updated product
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => updateProductIndex(-1));
    nextBtn.addEventListener('click', () => updateProductIndex(1));

    fetchProducts(); // Initial data fetch
});