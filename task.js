// script.js
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container');
    const searchIcon = document.getElementById("search-icon");
    const searchInput = document.getElementById("search-input");

    // Fetch and display all products initially
    fetchProducts('https://dummyjson.com/products');


    // Event listener for the search bar
    searchIcon.addEventListener("click", function () {
        if (searchInput.style.display === "none" || searchInput.style.display === "") {
            searchInput.style.display = "block";
            searchInput.focus();
        } else {
            searchInput.style.display = "none";
        }
    });

    document.addEventListener("click", function (e) {
        if (!searchIcon.contains(e.target) && !searchInput.contains(e.target)) {
            searchInput.style.display = "none";
        }
    });

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim();
        if (query) {
            fetch(`https://dummyjson.com/products/search?q=${query}`)
                .then(res => res.json())
                .then(data => {
                    displayProducts(data.products);
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            fetchProducts('https://dummyjson.com/products');
        }
    });

    // Function to fetch products from the API
    function fetchProducts(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const products = data.products;
                displayProducts(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Function to display products
    function displayProducts(products) {
        productContainer.innerHTML = '';// Clear existing products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card-product-container');

            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.thumbnail}" alt="${product.title}" />
                    <div class="add-cart-btn">
                        <button>Add to Cart</button>
                    </div>
                </div>
                <div class="category-style">
                    <p>${product.category}</p>
                </div>
                <div class="product-name">
                    <p>${product.title}</p>
                </div>
                <div class="product-price-rating">
                    <p class="price">${product.price} $</p>
                    <p>${product.rating} <i class="fa-regular fa-star"></i></p>
                </div>
            `;

            productContainer.appendChild(productCard);
        });
    }
});
