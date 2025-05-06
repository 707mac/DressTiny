// Elementy interfejsu
const productMens = document.getElementById("productMens");
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
  24: "Czarne skarpety we wzorki wykonane z bawełny.",
  25: "Czarne masywne buty.",
  26: "Czarno białe długie skarpety.",
  27: "Zamszowe jasnoszare buty idealnie nadające się na zimę.",
  73: "Czarna lekka kurtka wiatrówka idealna na wiosnę i jesień.",
  74: "Czarna krótka kurtka puchowa idealna na zimę.",
  75: "Przejściowa kurtka wykonana z ciepłego polaru.",
  76: "Długa kurtka puchowa nadająca się idealnie na zimę.",
  77: "Czarna przewiewna kurtka idealnie nadająca się dla osób uprawiających sporty zimowe.",
  78: "Kurtka przejściowa, idealna na jesień lub wiosnę.",
  79: "Spodnie joggery w kolorze szarym.",
  80: "Czarne długie spodnie.",
  81: "Spodnie narciarskie idealnie nadające się dla osób uprawiających sporty zimowe.",
  82: "Spodnie dresowe w kolorze zielonym.",
  67: "Krótkie buty w kolorze biało czarnym idealnie nadające się na aktywnych osób.",
  68: "Krótkie buty w kolorze biało czarnym.",
  69: "Buty new balance w kolorze czarnym.",
  70: "Buty nike w kolorze białym,",
  71: "Buty wielokolorowe nike idealne dla aktywnych osób.",
  72: "Buty nike dunk wielokolorowe.",
  30: "Zestaw swetrów idealnych na jesień w kolorze białym i czarnym.",
  31: "Biały golf wykonany z 100% bawełny.",
  32: "Biały luźny sweter wykonany z wiskozy.",
  33: "Biały dopasowany sweter wykonany z bawełny.",
  34: "Bezowy sweter wykonany z wełny.",
  35: "Biały cienki sweter idealny na cieplejsze dni.",
  36: "Zestaw skarpet w kolorze białym.",
  37: "Zestaw krótkich skarpet w róznych odcieniach.",
  38: "Zestaw krótkich skarpet w róznych odcieniach.",
  39: "Zestaw dłuzszych skarpet w kolorze czarnym.",
  40: "Długie skarpety sportowe idelane dla aktywnych osób.",
  41: "Zestaw długich skarpet sportowych.",
  42: "Zestaw długich skarpet adidas.",
  43: "Skarpety narciarskie, nieprzemakalne idealne dla osób uprawijących sporty zimowe.",
  44: "Zestaw długich białych skarpet adidas.",
  47: "Zestaw czarnych długich skarpet wykonanych z bawełny.",
  48: "Zestaw białych długich skarpet.",
  49: "Czarny bawełniany t-shirt.",
  50: "Biały bawełniany t-shirt.",
  51: "Ciemno zielony bawełniany t-shirt.",
  52: "Czarny t-shirt z bawełny i wiskozy.",
  53: "Biały luźny t-shirt.",
  54: "T-shirt w kolorze bezowym wykonany z bawełny.",
  55: "T-shirt bawełniany w kolorze jasno szarym.",
  56: "T-shirt dopasowany w kolorze czarnym wykonany w większości z wiskozy.",
  57: "Jasno bezowy t-shirt zawierający logo wykonany z bawełny.",
  58: "Jasno brązowy t-shirt wykonany z bawełny.",
  59: "Turkusowy t-shirt wykonany z bawełny.",
  61: "Jasno brązowa bluza wykonana z 100% bawełny z kapturem.",
  62: "Szara bluza z kapturem wykonana z bawełny.",
  63: "Czarna bluza z kapturem wykonana z bawełny.",
  64: "Jasno zielona bluza z kapturem wykonana z bawełny.",
  65: "Biała bawełniana bluza.",
  66: "Czarna bluza z kaputem.",
  83: "Czapka z daszkiem w kolorze szarym.",
  84: "Czarna czapka wykonana z bawełny.",
  85: "Czarna czapka idealna na chłodne dni.",
  86: "Czarna czapka z daszkiem zawierająca logo.",
  87: "Czarne okulary przeciwsłoneczne.",
  88: "Czarna męska kosmetyczka.",
  89: "Torba na siłownię marki puma.",
  90: "Czarna kosmetyczka męska, idealna na wyjazdy.",
  91: "Perfumy męskie o zapachu cytrusów."
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
productMens.addEventListener("click", (e) => {
  const product = e.target.closest(".product");
  if (product && !e.target.classList.contains("product-favorite")) {
    const id = product.getAttribute("data-product-id");
    openProductModal(id);
  }
});

// Klik na małe serduszko
productMens.addEventListener("click", (e) => {
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
  const container = document.getElementById("productMens");
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
  const container = document.getElementById("productMens");
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



