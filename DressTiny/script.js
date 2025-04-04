// Delay to show main page after loading splash screen
setTimeout(function() {
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.classList.add('fade-out');
    
    // After fade-out animation ends, show login container
    setTimeout(function() {
        splashScreen.style.display = 'none';
        document.getElementById('loginContainer').classList.add('show');
    }, 1500); // Time equal to fade-out animation duration
    
}, 3000);

// Login and redirect to main page
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check credentials
    if (username === 'student' && password === 'WSPA') {
        const loginContainer = document.getElementById('loginContainer');
        loginContainer.classList.remove('show');
        
        setTimeout(function() {
            loginContainer.style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
        }, 500);
    } else {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Nie ma takiego użytkownika';
        
        // Remove any existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Insert after the form
        const form = document.getElementById('loginForm');
        form.parentNode.insertBefore(errorMessage, form.nextSibling);
        
        // Clear password field
        document.getElementById('password').value = '';
    }
};

// Sliding images
const sliderImages = document.getElementById('sliderImages');
let index = 0;

function moveSlider() {
    index++;
    if (index >= sliderImages.children.length) {
        index = 0; // Return to first image
    }
    const offset = -index * 100; // Calculate offset
    sliderImages.style.transform = `translateX(${offset}%)`;
}

setInterval(moveSlider, 3000); // Move images every 3 seconds
window.onload = moveSlider; // Start after page loads

// Product data - Updated to include all 23 products
const products = [
    {
        id: 1,
        name: "Product 1",
        price: "99 PLN",
        image: "Product 1.jpg",
        description: "Elegant men's shirt made of high-quality cotton. Perfect for business meetings and special occasions."
    },
    {
        id: 2,
        name: "Product 2",
        price: "149 PLN",
        image: "Product 2.jpg",
        description: "Trendy women's high-waisted jeans. Comfortable and stylish, matches many outfits."
    },
    {
        id: 3,
        name: "Product 3",
        price: "89 PLN",
        image: "Product 3.jpg",
        description: "Classic women's blouse in white. A versatile wardrobe item for any season."
    },
    {
        id: 4,
        name: "Product 4",
        price: "129 PLN",
        image: "Product 4.jfif",
        description: "Sports rain jacket. Protects against wind and rain, perfect for outdoor activities."
    },
    {
        id: 5,
        name: "Product 5",
        price: "179 PLN",
        image: "Product 5.jpg",
        description: "Elegant men's shoes made of genuine leather. Comfortable and durable, suitable for suits."
    },
    {
        id: 6,
        name: "Product 6",
        price: "99 PLN",
        image: "Product 6.jpg",
        description: "Casual summer dress with floral pattern. Light and breathable, perfect for vacations."
    },
    {
        id: 7,
        name: "Product 7",
        price: "139 PLN",
        image: "Product 7.jpg",
        description: "Unisex denim jacket. A classic model that never goes out of style."
    },
    {
        id: 8,
        name: "Product 8",
        price: "119 PLN",
        image: "Product 8.jpg",
        description: "Oversize merino wool sweater. Warm and comfortable, perfect for cooler days."
    },
    {
        id: 9,
        name: "Product 9",
        price: "89 PLN",
        image: "Product 9.jpg",
        description: "Men's sweatpants with pockets. Comfortable for everyday wear and activities."
    },
    {
        id: 10,
        name: "Product 10",
        price: "99 PLN",
        originalPrice: "149 PLN",
        image: "Product 10.jpg",
        description: "Classic blue denim jacket. A versatile wardrobe item."
    },
    {
        id: 11,
        name: "Product 11",
        price: "129 PLN",
        originalPrice: "179 PLN",
        image: "Product 11.jpg",
        description: "Women's autumn coat in beige. Elegant and practical."
    },
    {
        id: 12,
        name: "Product 12",
        price: "89 PLN",
        originalPrice: "129 PLN",
        image: "Product 12.jfif",
        description: "Men's gray hoodie. Comfortable for everyday wear."
    },
    {
        id: 13,
        name: "Product 13",
        price: "149 PLN",
        originalPrice: "199 PLN",
        image: "Product 13.jfif",
        description: "Men's two-piece suit. Perfect for important ceremonies."
    },
    {
        id: 14,
        name: "Product 14",
        price: "119 PLN",
        originalPrice: "159 PLN",
        image: "Product 14.jfif",
        description: "Evening dress in black. Elegant and chic."
    },
    {
        id: 15,
        name: "Product 15",
        price: "149 PLN",
        image: "Product 15.jpg",
        description: "Elegant navy blue men's blazer."
    },
    {
        id: 16,
        name: "Product 16",
        price: "129 PLN",
        image: "Product 16.jpg",
        description: "Black pencil skirt."
    },
    {
        id: 17,
        name: "Product 17",
        price: "179 PLN",
        image: "Product 17.jpg",
        description: "Winter puffer jacket with hood."
    },
    {
        id: 18,
        name: "Product 18",
        price: "99 PLN",
        image: "Product 18.jpg",
        description: "Cotton t-shirt with print."
    },
    {
        id: 19,
        name: "Product 19",
        price: "139 PLN",
        image: "Product 19.jpg",
        description: "Men's suit pants in gray."
    },
    {
        id: 20,
        name: "Product 20",
        price: "119 PLN",
        image: "Product 20.jpg",
        description: "Women's silk blouse in pastel color."
    },
    {
        id: 21,
        name: "Product 21",
        price: "89 PLN",
        image: "Product 21.jpg",
        description: "Women's high-waisted denim shorts."
    },
    {
        id: 22,
        name: "Product 22",
        price: "159 PLN",
        image: "Product 22.jpg",
        description: "Women's beige trench coat."
    },
    {
        id: 23,
        name: "Product 23",
        price: "109 PLN",
        image: "Product 23.jpg",
        description: "Men's plaid vest."
    }
];

// Favorite products functionality
let favoriteProducts = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesIcon = document.getElementById('favoritesIcon');
const normalView = document.getElementById('normalView');
const favoritesView = document.getElementById('favoritesView');
const favoritesList = document.getElementById('favoritesList');
const modalFavorite = document.getElementById('modalFavorite');

// Comments functionality
let productComments = JSON.parse(localStorage.getItem('productComments')) || {};
const commentsContainer = document.getElementById('commentsContainer');
const commentAuthor = document.getElementById('commentAuthor');
const commentText = document.getElementById('commentText');
const submitComment = document.getElementById('submitComment');

// Update favorites icon if there are favorites
if (favoriteProducts.length > 0) {
    favoritesIcon.classList.add('active');
}

// Initialize sale products functionality
function initSaleProducts() {
    // Handle click on sale products to show description
    document.querySelectorAll('.sale-product').forEach(product => {
        product.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const productData = products.find(p => p.id === productId);
            if (productData) {
                showProductDetails(productId);
            }
        });
        
        // Handle favorite toggle
        const favIcon = product.querySelector('.product-favorite');
        favIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            toggleFavorite(productId, this);
        });
    });
}

// Function to open modal with product details
function openProductModal(product) {
    const modal = document.createElement('div');
    modal.className = 'product-modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-favorite">❤</div>
            <img class="modal-image" src="${product.image}" alt="${product.name}">
            <h3 class="modal-title">${product.name}</h3>
            <div class="modal-price">
                <span class="sale-price">${product.price} zł</span>
                <span class="original-price">${product.oldPrice} zł</span>
                <span class="discount">-${Math.round((1 - product.price/product.oldPrice) * 100)}%</span>
            </div>
            <p class="modal-description">${product.description}</p>
            <div class="modal-comments">
                <h3 class="modal-comments-title">Comments</h3>
                <div id="modalCommentsContainer"></div>
                <div class="add-comment">
                    <h4>Add comment</h4>
                    <div class="comment-input">
                        <input type="text" class="modal-comment-author" placeholder="Your name" required>
                        <textarea class="modal-comment-text" placeholder="Your comment..." required></textarea>
                        <button type="button" class="comment-submit modal-comment-submit">Add comment</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set favorite status
    const favIcon = modal.querySelector('.modal-favorite');
    if (isFavorite(product.id)) {
        favIcon.classList.add('active');
    }
    
    // Handle modal favorite toggle
    favIcon.addEventListener('click', function() {
        this.classList.toggle('active');
        toggleFavorite(product.id);
        
        // Update favorite icon in product list if visible
        const productFavIcon = document.querySelector(`.product-favorite[data-product-id="${product.id}"]`);
        if (productFavIcon) {
            productFavIcon.classList.toggle('active');
        }
    });
    
    // Load comments for this product
    const commentsContainer = modal.querySelector('#modalCommentsContainer');
    function loadComments() {
        commentsContainer.innerHTML = '';
        
        if (!productComments[product.id] || productComments[product.id].length === 0) {
            const noComments = document.createElement('div');
            noComments.className = 'no-results';
            noComments.textContent = 'No comments. Be the first!';
            commentsContainer.appendChild(noComments);
            return;
        }
        
        productComments[product.id].forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-date">${comment.date}</div>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }
    
    loadComments();
    
    // Handle comment submission
    const submitBtn = modal.querySelector('.modal-comment-submit');
    const authorInput = modal.querySelector('.modal-comment-author');
    const textInput = modal.querySelector('.modal-comment-text');
    
    submitBtn.addEventListener('click', function() {
        const author = authorInput.value.trim();
        const text = textInput.value.trim();
        
        if (author && text) {
            if (!productComments[product.id]) {
                productComments[product.id] = [];
            }
            
            const newComment = {
                author: author,
                text: text,
                date: new Date().toLocaleString()
            };
            
            productComments[product.id].unshift(newComment);
            localStorage.setItem('productComments', JSON.stringify(productComments));
            
            loadComments();
            authorInput.value = '';
            textInput.value = '';
        }
    });
    
    // Handle close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Improved function to attach product events
function attachProductEvents() {
    // Regular products
    document.querySelectorAll('.product').forEach((product) => {
        product.addEventListener('click', () => {
            const productId = parseInt(product.getAttribute('data-product-id'));
            showProductDetails(productId);
        });

        const favIcon = product.querySelector('.product-favorite');
        if (favIcon) {
            favIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = parseInt(this.getAttribute('data-product-id'));
                toggleFavorite(productId, this);
            });
        }
    });
    
    // Initialize sale products
    initSaleProducts();
}

// Initialize product events
document.addEventListener('DOMContentLoaded', function() {
    attachProductEvents();
    
    // Set initial favorite states for all products (including sale products)
    document.querySelectorAll('.product, .sale-product').forEach(product => {
        const productId = parseInt(product.dataset.productId || product.dataset.id);
        if (isFavorite(productId)) {
            const favIcon = product.querySelector('.product-favorite');
            if (favIcon) {
                favIcon.classList.add('active');
            }
        }
    });
});

// Toggle between normal view and favorites view
favoritesIcon.addEventListener('click', function() {
    normalView.style.display = normalView.style.display === 'none' ? 'block' : 'none';
    favoritesView.classList.toggle('active');
    
    if (favoritesView.classList.contains('active')) {
        displayFavorites();
    }
});

// Function to display favorite products
function displayFavorites() {
    favoritesList.innerHTML = '';
    
    if (favoriteProducts.length === 0) {
        const noFavorites = document.createElement('div');
        noFavorites.className = 'no-results';
        noFavorites.textContent = 'No favorite products';
        favoritesList.appendChild(noFavorites);
        return;
    }
    
    // Get all favorite products (including 1-23)
    const favorites = products.filter(p => 
        favoriteProducts.includes(p.id)
    );
    
    favorites.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.setAttribute('data-product-id', product.id);
        productElement.innerHTML = `
            <div class="product-favorite active" data-product-id="${product.id}">&#10084;</div>
            <img src="${product.image}" alt="${product.name}">
            <div class="name">${product.name}</div>
            <div class="price">${product.price}</div>
        `;
        favoritesList.appendChild(productElement);
    });

    attachProductEvents();
}

// Function to load comments for a product
function loadComments(productId) {
    commentsContainer.innerHTML = '';
    
    if (!productComments[productId] || productComments[productId].length === 0) {
        const noComments = document.createElement('div');
        noComments.className = 'no-results';
        noComments.textContent = 'No comments. Be the first!';
        commentsContainer.appendChild(noComments);
        return;
    }
    
    productComments[productId].forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-date">${comment.date}</div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Function to add a new comment
function addComment(productId, author, text) {
    if (!productComments[productId]) {
        productComments[productId] = [];
    }
    
    const newComment = {
        author: author,
        text: text,
        date: new Date().toLocaleString()
    };
    
    productComments[productId].unshift(newComment);
    localStorage.setItem('productComments', JSON.stringify(productComments));
    
    loadComments(productId);
    commentAuthor.value = '';
    commentText.value = '';
}

// Product modal functionality
const productModal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementById('closeModal');
let currentProductId = null;

// Function to show product details in modal
function showProductDetails(productId) {
    const productData = products.find(p => p.id === productId);
    
    if (productData) {
        currentProductId = productId;
        modalImage.src = productData.image;
        modalTitle.textContent = productData.name;
        
        // Handle sale products with original price
        if (productData.originalPrice) {
            modalPrice.innerHTML = `<span class="old-price">${productData.originalPrice}</span> ${productData.price}`;
        } else {
            modalPrice.textContent = productData.price;
        }
        
        modalDescription.textContent = productData.description || 'No product description';
        
        // Update favorite status
        modalFavorite.classList.toggle('active', favoriteProducts.includes(productId));
        modalFavorite.setAttribute('data-product-id', productId);
        
        loadComments(productId);
        productModal.classList.add('active');
    }
}

function toggleFavorite(productId, element) {
    // Allow adding all products (1-23) to favorites
    const index = favoriteProducts.indexOf(productId);
    
    if (index === -1) {
        favoriteProducts.push(productId);
        if (element) element.classList.add('active');
        
        if (favoriteProducts.length === 1) {
            favoritesIcon.classList.add('active');
        }
    } else {
        favoriteProducts.splice(index, 1);
        if (element) element.classList.remove('active');
        
        if (favoriteProducts.length === 0) {
            favoritesIcon.classList.remove('active');
        }
        
        if (favoritesView.classList.contains('active')) {
            displayFavorites();
        }
    }
    
    localStorage.setItem('favorites', JSON.stringify(favoriteProducts));
}

function isFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(productId);
}

// Add click event to modal favorite icon
modalFavorite.addEventListener('click', function() {
    const productId = parseInt(this.getAttribute('data-product-id'));
    toggleFavorite(productId, this);
    
    const productFavIcon = document.querySelector(`.product-favorite[data-product-id="${productId}"]`);
    if (productFavIcon) {
        productFavIcon.classList.toggle('active');
    }
});

// Close modal when clicking X or outside
closeModal.addEventListener('click', () => {
    productModal.classList.remove('active');
});

productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('active');
    }
});

// Submit comment handler
submitComment.addEventListener('click', function() {
    if (!currentProductId) return;
    
    const author = commentAuthor.value.trim();
    const text = commentText.value.trim();
    
    if (author && text) {
        addComment(currentProductId, author, text);
    }
});

// Allow submitting comment with Enter key in textarea
commentText.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitComment.click();
    }
});

// SEARCH FUNCTIONALITY
const searchBar = document.getElementById('searchBar');
const searchSuggestions = document.getElementById('searchSuggestions');
const productSuggestions = document.getElementById('productSuggestions');
const regularProductsSection = document.getElementById('productSuggestions');

// Store original HTML to reset when search is cleared
const originalProductHTML = productSuggestions.innerHTML;
const originalRegularProductsHTML = regularProductsSection.innerHTML;

searchBar.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        searchSuggestions.style.display = 'none';
        productSuggestions.innerHTML = originalProductHTML;
        regularProductsSection.innerHTML = originalRegularProductsHTML;
        attachProductEvents();
        return;
    }

    // Check if search term is a product number (like "1", "2", etc.)
    const isProductNumberSearch = /^\d+$/.test(searchTerm);

    // Filter products based on search term
    const filteredProducts = products.filter(product => {
        if (isProductNumberSearch) {
            // For number searches, match exact product ID
            return product.id === parseInt(searchTerm);
        } else {
            // For text searches, match name or description
            return product.name.toLowerCase().includes(searchTerm) ||
                   (product.description && product.description.toLowerCase().includes(searchTerm)) ||
                   product.price.toLowerCase().includes(searchTerm);
        }
    });

    // Update the search suggestions
    if (filteredProducts.length > 0) {
        searchSuggestions.innerHTML = '';
        filteredProducts.forEach(product => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'search-suggestion-item';
            
            const suggestionContent = document.createElement('div');
            suggestionContent.className = 'suggestion-content';
            
            const nameElement = document.createElement('div');
            nameElement.className = 'suggestion-name';
            nameElement.textContent = product.name;
            
            const descElement = document.createElement('div');
            descElement.className = 'suggestion-desc';
            descElement.textContent = product.description;
            
            const priceElement = document.createElement('div');
            priceElement.className = 'suggestion-price';
            priceElement.textContent = product.price;
            
            suggestionContent.appendChild(nameElement);
            suggestionContent.appendChild(descElement);
            suggestionContent.appendChild(priceElement);
            suggestionItem.appendChild(suggestionContent);
            
            suggestionItem.addEventListener('click', () => {
                showProductDetails(product.id);
                searchBar.value = product.name;
                searchSuggestions.classList.remove('visible');
                setTimeout(() => { searchSuggestions.style.display = 'none'; }, 250);
            });
            searchSuggestions.appendChild(suggestionItem);
        });
        
        searchSuggestions.style.display = 'block';
        setTimeout(() => {
            searchSuggestions.classList.add('visible');
        }, 10);
    } else {
        searchSuggestions.classList.remove('visible');
        setTimeout(() => {
            searchSuggestions.style.display = 'none';
        }, 250);
    }

    updateProductGrid(productSuggestions, filteredProducts);
    updateProductGrid(regularProductsSection, filteredProducts);
});

function updateProductGrid(container, filteredProducts) {
    container.innerHTML = '';

    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="no-results">No search results</div>';
        return;
    }

    filteredProducts.forEach(product => {
        // Only show products 1-14 by default, or 15-23 if they're favorited
        if (product.id <= 14 || favoriteProducts.includes(product.id)) {
            const isFavorite = favoriteProducts.includes(product.id);
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.setAttribute('data-product-id', product.id);
            productElement.innerHTML = `
                <div class="product-favorite ${isFavorite ? 'active' : ''}" data-product-id="${product.id}">&#10084;</div>
                <img src="${product.image}" alt="${product.name}">
                <div class="name">${product.name}</div>
                <div class="price">${product.price}</div>
            `;
            container.appendChild(productElement);
        }
    });

    attachProductEvents();
}

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== searchBar) {
        searchSuggestions.style.display = 'none';
    }
});