

// Product data - Updated to include all 23 products
const products = [
    {
        id: 24,
        name: "Product 24",
        price: "119 PLN",
        image: "Product 24.jpeg",
        description: "Elegant men's shirt made of high-quality cotton. Perfect for business meetings and special occasions."
    },
    {
        id: 25,
        name: "Product 25",
        price: "55 PLN",
        image: "Product 25.jpeg",
        description: "Trendy women's high-waisted jeans. Comfortable and stylish, matches many outfits."
    },
    {
        id: 26,
        name: "Product 26",
        price: "200 PLN",
        image: "Product 26.jpeg",
        description: "Classic women's blouse in white. A versatile wardrobe item for any season."
    },
    {
        id: 27,
        name: "Product 27",
        price: "89 PLN",
        image: "Product 27.jpeg",
        description: "Sports rain jacket. Protects against wind and rain, perfect for outdoor activities."
    },
    {
        id: 28,
        name: "Product 28",
        price: "67 PLN",
        image: "Product 28.jpeg",
        description: "Elegant men's shoes made of genuine leather. Comfortable and durable, suitable for suits."
    },
    {
        id: 29,
        name: "Product 29",
        price: "45 PLN",
        image: "Product 29.jpeg",
        description: "Casual summer dress with floral pattern. Light and breathable, perfect for vacations."
    },
];



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

document.getElementById('mensClothingTab')?.addEventListener('click', 
    function() {
        window.location.href = 'mens-clothing.html'
    })

// Favorite products functionality
let favoriteProducts = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesIcon = document.getElementById('favoritesIcon');
const normalView = document.getElementById('normalView');
const favoritesView = document.getElementById('favoritesView');
const favoritesList = document.getElementById('favoritesList');
const modalFavorite = document.getElementById('modalFavorite');

// Comments functionality
let productComments = JSON.parse(localStorage.getItem('productComments')) || {};
const commentsContainer1 = document.getElementById('commentsContainer');
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
    `;}
    
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
  

// script.js

let favorites = [];


// Event listener do przycisków ulubionych
document.querySelectorAll('product-favorite').forEach(button => {
   button.addEventListener('click', (event) => {
       const productId = event.target.parentElement.getAttribute('data-product-id');
       toggleFavorite(productId);
       updateFavoriteButtons();
   });
});




// Funkcja do dodawania produktu do ulubionych
function toggleFavorite(productId) {
   const index = favorites.indexOf(productId);
   if (index === -1) {
       favorites.push(productId);
   } else {
       favorites.splice(index, 1);
   }
}




// Funkcja do aktualizacji przycisków ulubionych
function updateFavoriteButtons() {
   const buttons = document.querySelectorAll('product-favorite');
   buttons.forEach(button => {
       const productId = button.parentElement.getAttribute('data-product-id');
       if (favorites.includes(productId)) {
           button.classList.add('favorite');
       } else {
           button.classList.remove('favorite');
       }
   });
}


// Funkcja do wyświetlania ulubionych produktów
function showFavorites() {
   const favoritesList = document.getElementById('favorites-list');
   favoritesList.innerHTML = ''; // Czyścimy listę
   favorites.forEach(id => {
       const li = document.createElement('li');
       li.textContent = `Produkt ID: ${id}`;
       favoritesList.appendChild(li);
   });
   document.getElementById('products').style.display = 'none';
   document.getElementById('favorites').style.display = 'block';
}




































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



























