// Elementy interfejsu
const productKids = document.getElementById("productKids");
const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalFavorite = document.getElementById("modalFavorite");
const commentsContainer = document.getElementById("commentsContainer");
const submitComment = document.getElementById("submitComment");
const commentAuthor = document.getElementById("commentAuthor");
const commentText = document.getElementById("commentText");
const closeModal = document.getElementById("closeModal");

const favoritesIcon = document.getElementById("favoritesIcon");
const favoritesView = document.getElementById("favoritesView");
const favoritesList = document.getElementById("favoritesList");
const normalView = document.getElementById("normalView");

const logo = document.querySelector(".app-logo");
const searchBar = document.getElementById("search-bar");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentProductId = null;

const productDescriptions = {
  131: "Brązowa bluza wykonana w 100% z bawełny.",
  132: "Bluza z nadrukiem stokrtotek.",
  133: "Brązowa bluza dziecięca.",
  134: "Bluza z nadrukiem gruszek.",
  135: "Biały bawełniany t-shirt dziecięcy.",
  137: "T-shirt dziecięcy z minimalnym logo.",
  138: "Rózowy t-shirt z króliczkiem.",
  139: "Zielony cienki t-shirt dziecięcy.",
  140: "Dziewczęce buty sportowe.",
  141: "Chłopięce buty sportowe.",
  142: "Nieprzemakalne kalosze dziecięce.",
  143: "Idealne na mrozy buty zimowe dla dzieci.",
  144: "Zielony sweter z napisem.",
  145: "Zestaw swetrów czarny i bezowy.",
  146: "Kaszmirowy sweterek dziecięcy.",
  147: "Bezowy sweterek dziecięcy.",
  148: "Białe skarpetki dziecięce.",
  149: "Zestaw długich skarpetek 3 pary.",
  150: "Skarpetki dziecięce w jednorozce.",
  151: "Zestaw krótkich skarpetek dziecięcych.",
  

  
 
};

// Ustaw kolor dużego serduszka
favoritesIcon.style.color = "#8b0000";

// Funkcja odświeżania widoku produktów
function renderProducts(container, ids) {
  container.innerHTML = "";
  ids.forEach((id) => {
    const product = document.querySelector(`.product[data-product-id="${id}"]`);
    if (product) {
      const clone = product.cloneNode(true);
      container.appendChild(clone);
    }
  });
}

// Klik na produkt — otwórz modal
productKids.addEventListener("click", (e) => {
  const product = e.target.closest(".product");
  if (product && !e.target.classList.contains("product-favorite")) {
    const id = product.getAttribute("data-product-id");
    openProductModal(id);
  }
});

// Klik na małe serduszko
productKids.addEventListener("click", (e) => {
  if (e.target.classList.contains("product-favorite")) {
    const id = e.target.getAttribute("data-product-id");
    toggleFavorite(id);
    e.stopPropagation();
  }
});

// Funkcja otwierania modala
function openProductModal(id) {
  const product = document.querySelector(`.product[data-product-id="${id}"]`);
  modalImage.src = product.querySelector("img").src;
  modalTitle.textContent = product.querySelector(".name").textContent;
  modalPrice.textContent = product.querySelector(".price").textContent;
  modalDescription.textContent = productDescriptions[id] || "Brak opisu dla tego produktu.";
  modalFavorite.setAttribute("data-product-id", id);
  modalFavorite.classList.toggle("active", favorites.includes(id));
  currentProductId = id;
  loadComments(id);
  productModal.style.display = "flex";
}

// Zamknięcie modala
closeModal.addEventListener("click", () => {
  productModal.style.display = "none";
});

// Toggle ulubionych
function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesIcons();
}

// Odświeżenie ikon serduszek
function updateFavoritesIcons() {
  document.querySelectorAll(".product-favorite").forEach((icon) => {
    const id = icon.getAttribute("data-product-id");
    icon.style.color = favorites.includes(id) ? "#8b0000" : "#b0b0b0";
  });
  modalFavorite.classList.toggle("active", favorites.includes(currentProductId));
}

// Dodanie komentarza
submitComment.addEventListener("click", () => {
  const author = commentAuthor.value.trim();
  const text = commentText.value.trim();
  if (!author || !text) return;

  const comments = JSON.parse(localStorage.getItem(`comments_${currentProductId}`)) || [];
  comments.push({ author, text, date: new Date().toLocaleString() });
  localStorage.setItem(`comments_${currentProductId}`, JSON.stringify(comments));

  commentAuthor.value = "";
  commentText.value = "";
  loadComments(currentProductId);
});

// Wczytanie komentarzy
function loadComments(id) {
  commentsContainer.innerHTML = "";
  const comments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];

  if (comments.length === 0) {
    const noComments = document.createElement("div");
    noComments.textContent = "No comments. Be the first!";
    noComments.style.color = "#999";
    noComments.style.fontSize = "16px";
    noComments.style.textAlign = "center";
    noComments.style.marginTop = "10px";
    commentsContainer.appendChild(noComments);
    return;
  }

  comments.forEach((comment) => {
    const commentEl = document.createElement("div");
    commentEl.className = "comment";
    commentEl.innerHTML = `
      <div class="comment-author">${comment.author}</div>
      <div class="comment-text">${comment.text}</div>
      <div class="comment-date">${comment.date}</div>
    `;
    commentsContainer.appendChild(commentEl);
  });
}

// Klik na serduszko w modalu
modalFavorite.addEventListener("click", () => {
  toggleFavorite(modalFavorite.getAttribute("data-product-id"));
});

// Favorites widok
favoritesIcon.addEventListener("click", () => {
  normalView.style.display = "none";
  favoritesView.style.display = "block";
  renderProducts(favoritesList, favorites);
  updateFavoritesIcons();
});

// Powrót przez logo
logo.addEventListener("click", () => {
  normalView.style.display = "block";
  favoritesView.style.display = "none";
  searchBar.value = "";
  document.querySelectorAll(".product").forEach(p => p.style.display = "block");
});

// Szukajka
searchBar.addEventListener("input", () => {
  const value = searchBar.value.toLowerCase();
  document.querySelectorAll(".product").forEach(product => {
    const name = product.querySelector(".name").textContent.toLowerCase();
    product.style.display = name.includes(value) ? "block" : "none";
  });
});

  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const products = document.querySelectorAll('.product');

    // Funkcja zmieniająca aktywną zakładkę i wyświetlająca odpowiednie produkty
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Ukrywamy wszystkie produkty
            products.forEach(product => product.style.display = 'none');
            
            // Pobieramy kategorię z klikniętej zakładki
            const category = tab.innerText;

            // Pokazujemy produkty tylko dla wybranej kategorii
            products.forEach(product => {
                if (product.getAttribute('data-category') === category) {
                    product.style.display = 'block';
                }
            });

            // Usuwamy klasę 'active' ze wszystkich zakładek
            tabs.forEach(t => t.classList.remove('active'));

            // Dodajemy klasę 'active' do klikniętej zakładki
            tab.classList.add('active');
        });
    });

    // Domyślnie wyświetlamy kategorię "Sneakersy"
    document.getElementById('tab-sneakers').click();
});

function toggleDropdown() {
  const menu = document.getElementById('dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; // Toggle display
}

// Automatyczne zamknięcie dropdowna po kliknięciu poza nim
document.addEventListener('click', function (e) {
  const button = document.querySelector('.dropdown-button');
  const menu = document.getElementById('dropdown-menu');

  // Jeśli kliknięto poza przyciskiem i menu, zamknij menu
  if (!button.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// Sortowanie po cenie
function getPriceFromText(text) {
  return parseFloat(text.replace('PLN', '').trim());
}

function sortProducts(order) {
  const container = document.getElementById("productKids");
  const products = Array.from(container.querySelectorAll(".product"));

  const sorted = products.sort((a, b) => {
    const priceA = getPriceFromText(a.querySelector(".price").textContent);
    const priceB = getPriceFromText(b.querySelector(".price").textContent);
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });

  container.innerHTML = "";
  sorted.forEach(p => container.appendChild(p));

  document.getElementById("sort-dropdown").style.display = "none"
}

document.getElementById("sortLowToHigh").addEventListener("click", () => {
  sortProducts("asc");
});

document.getElementById("sortHighToLow").addEventListener("click", () => {
  sortProducts("desc");
});

// Sortowanie po nazwie
function sortProductsByName(order) {
  const container = document.getElementById("productKids");
  const products = Array.from(container.querySelectorAll(".product"));

  const sorted = products.sort((a, b) => {
    const nameA = a.querySelector(".name").textContent.toLowerCase();
    const nameB = b.querySelector(".name").textContent.toLowerCase();

    if (order === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  container.innerHTML = "";
  sorted.forEach(p => container.appendChild(p));

  document.getElementById("sort-dropdown").style.display = "none";
}

document.getElementById("sortAZ").addEventListener("click", () => {
  sortProductsByName("asc");
});

document.getElementById("sortZA").addEventListener("click", () => {
  sortProductsByName("desc");
});

//Sortowanie po kolorze
function filterByColor(color) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const productColor = product.getAttribute("data-color");
    if (color === "all" || productColor === color) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// Nasłuchiwanie kliknięć w filtr kolorów
document.getElementById("filterColorBlack").addEventListener("click", () => {
  filterByColor("czarny");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorGreen").addEventListener("click", () => {
  filterByColor("zielony");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorBeige").addEventListener("click", () => {
  filterByColor("bezowy");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorAll").addEventListener("click", () => {
  filterByColor("all");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorGrey").addEventListener("click", () => {
  filterByColor("szary");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorWhite").addEventListener("click", () => {
  filterByColor("biały");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorBrown").addEventListener("click", () => {
  filterByColor("brązowy");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorTurquoise").addEventListener("click", () => {
  filterByColor("turkusowy");
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
});

document.getElementById("filterColorPink").addEventListener("click", () => {
    filterByColor("rozowy");
    document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
  });

  document.getElementById("filterColorBlue").addEventListener("click", () => {
    filterByColor("niebieski");
    document.getElementById("filter-dropdown").style.display = "none"; // Zamknij dropdown po kliknięciu
  });
  

// Funkcje toggle dla sortowania i filtrowania
function toggleSortDropdown() {
  const sortMenu = document.getElementById("sort-dropdown");
  sortMenu.style.display = sortMenu.style.display === "block" ? "none" : "block";
  document.getElementById("filter-dropdown").style.display = "none"; // Zamknij drugi dropdown
}

function toggleFilterDropdown() {
  const filterMenu = document.getElementById("filter-dropdown");
  filterMenu.style.display = filterMenu.style.display === "block" ? "none" : "block";
  document.getElementById("sort-dropdown").style.display = "none"; // Zamknij drugi dropdown
}

// Aktualizacja ikon ulubionych
updateFavoritesIcons();