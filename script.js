function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function init() {
  renderHeader();
  renderRestaurantHeader();
  renderMenu();
  renderCart()
  renderFooter();
}

function renderHeader() {
  let headerRef = document.getElementById("header_main");
  headerRef.innerHTML = getHtmlforHeader();
}

function renderMenu() {
  let menuContainer = document.getElementById("menu_box");
  for (let category of categories) {
    // Abschnitt für jede Kategorie erstellen
    menuContainer.innerHTML += getHtmlforSection(category);

    let categoryContainer = document.getElementById(`menu_${category.key}`);

    // Items der Kategorie einfügen
    for (let i = 0; i < menu.length; i++) {
      let item = menu[i];
      let image = menuImages[i];

      if (item.category === category.key) {
        categoryContainer.innerHTML += getHtmlforMenuItem(item, image);
      }
    }
  }
}

function renderRestaurantHeader() {
  let restHeaderRef = document.getElementById("restaurant_header");
  restHeaderRef.innerHTML = getHtmlforRestaurantHeader();
}

function renderCart() {
  let basket = document.getElementById("basket_items");
  let subtotal = 0;
  let delivery = 4.99;

  basket.innerHTML = "";

  cart.forEach((item) => {
    subtotal += item.price * item.amount;

    basket.innerHTML += getHtmlforBasket(item);
  });

  let total = subtotal + delivery;

  document.getElementById("basket_totals").innerHTML =
    getHtmlforBasketTotal(total,subtotal,delivery);
}

function renderFooter() {
  let footerRef = document.getElementById("footer_content");
  footerRef.innerHTML = getHtmlforFooter();
}

function addToCart(itemName) {
  // Suche das angeklickte Produkt im menu-Array
  let item = menu.find((m) => m.name === itemName);

  // Falls das Produkt nicht gefunden wird → abbrechen
  if (!item) return;

  // Prüfen, ob das Produkt schon im Warenkorb ist
  let cartItem = cart.find((c) => c.name === itemName);

  if (cartItem) {
    // Wenn vorhanden → Menge um 1 erhöhen
    cartItem.amount++;
  } else {
    // Wenn noch nicht im Warenkorb →
    // neues Objekt hinzufügen (Kopie vom Menü-Item!)
    // Die drei Punkte nennt man den Spread Operator nimmt alles aus diesem Objekt und kopiert es
    cart.push({ ...item, amount: 1 });
  }

  // Nach jeder Änderung → Warenkorb neu anzeigen
  renderCart();
}

function increaseItem(itemName) {
  let item = cart.find((i) => i.name === itemName);

  if (item) {
    item.amount++; // +1
  }

  renderCart();
}

function decreaseItem(itemName) {
  let item = cart.find((i) => i.name === itemName);

  if (item) {
    item.amount--; // -1

    // Wenn Menge 0 → komplett entfernen
    if (item.amount <= 0) {
      removeItem(itemName);
      return;
    }
  }

  renderCart();
}

function removeItem(itemName) {
  // Filtert das Item aus dem Warenkorb raus
  cart = cart.filter((i) => i.name !== itemName);

  renderCart();
}
