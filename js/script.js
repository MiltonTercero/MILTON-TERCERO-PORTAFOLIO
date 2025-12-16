// Product Data (Mock)
const products = [
    {
        id: 1,
        name: "Smartphone X Pro",
        price: 899.99,
        category: "smartphones",
        image: "https://via.placeholder.com/300?text=Smartphone+X",
        rating: 4.5
    },
    {
        id: 2,
        name: "Laptop UltraBook",
        price: 1299.00,
        category: "laptops",
        image: "https://via.placeholder.com/300?text=Laptop+Ultra",
        rating: 4.8
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 199.50,
        category: "audio",
        image: "https://via.placeholder.com/300?text=Headphones",
        rating: 4.2
    },
    {
        id: 4,
        name: "Smart Watch V2",
        price: 249.99,
        category: "accessories",
        image: "https://via.placeholder.com/300?text=Smart+Watch",
        rating: 4.0
    },
    {
        id: 5,
        name: "4K Monitor 27\"",
        price: 350.00,
        category: "accessories",
        image: "https://via.placeholder.com/300?text=4K+Monitor",
        rating: 4.6
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 79.99,
        category: "audio",
        image: "https://via.placeholder.com/300?text=Speaker",
        rating: 4.3
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const filterBtn = document.getElementById('filterBtn');
    const filterMenu = document.getElementById('filterMenu');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');

    let currentCategory = 'all';
    let currentPriceRange = 'all';
    let searchQuery = '';

    // Toggle Filter Menu
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterMenu.hidden = !filterMenu.hidden;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterMenu.contains(e.target) && e.target !== filterBtn) {
            filterMenu.hidden = true;
        }
    });

    // Search Functionality
    function performSearch() {
        searchQuery = searchInput.value.toLowerCase().trim();
        filterProducts();
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch); // Real-time search

    // Filter Functionality
    categoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        filterProducts();
    });

    priceFilter.addEventListener('change', (e) => {
        currentPriceRange = e.target.value;
        filterProducts();
    });

    // Filter Logic
    function filterProducts() {
        const filtered = products.filter(product => {
            // Category match
            const categoryMatch = currentCategory === 'all' || product.category === currentCategory;

            // Price match
            let priceMatch = true;
            if (currentPriceRange === 'low') priceMatch = product.price < 100;
            else if (currentPriceRange === 'mid') priceMatch = product.price >= 100 && product.price <= 500;
            else if (currentPriceRange === 'high') priceMatch = product.price > 500;

            // Search match
            const searchMatch = product.name.toLowerCase().includes(searchQuery);

            return categoryMatch && priceMatch && searchMatch;
        });

        renderProducts(filtered);
    }

    // Render Products
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No se encontraron productos.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            // Generate Stars
            const stars = '⭐'.repeat(Math.round(product.rating));

            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <div class="rating" title="${product.rating} estrellas">${stars}</div>
                    <button class="add-cart-btn" onclick="addToCart(${product.id})">Añadir al Carrito</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // Global cart function (for demo)
    window.addToCart = function (id) {
        const product = products.find(p => p.id === id);
        if (product) {
            alert(`¡Agregado al carrito: ${product.name}!`);
        }
    };

    // Initial Render
    renderProducts(products);
});
