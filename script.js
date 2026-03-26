// --------------------------
// INIT / STARTUP
// --------------------------

// Diese Funktion initialisiert die Seite, wird vermutlich beim Laden aufgerufen
function init() {
  renderHeader(); // Kopfbereich der Seite rendern
  renderRestaurantHeader(); // Header für das Restaurant rendern
  renderMenu(); // Menü anzeigen
  renderBasket(); // Warenkorb anzeigen
  renderFooter(); // Fußbereich rendern
}

// --------------------------
// HEADER / FOOTER RENDERING
// --------------------------

function renderHeader() {
  let headerRef = document.getElementById("header_main");
  headerRef.innerHTML = getHtmlforHeader(); // Dynamische HTML-Vorlage einfügen
}

function renderRestaurantHeader() {
  let restHeaderRef = document.getElementById("restaurant_header");
  restHeaderRef.innerHTML = getHtmlforRestaurantHeader();
}

function renderFooter() {
  let footerRef = document.getElementById("footer_content");
  footerRef.innerHTML = getHtmlforFooter();
}

// --------------------------
// MENU RENDERING
// --------------------------

function renderMenu() {
  let menuContainer = document.getElementById("menu_box");

  for (let category of categories) {
    menuContainer.innerHTML += getHtmlforSection(category); // Kategorie-Block

    let categoryContainer = document.getElementById(`menu_${category.key}`);

    for (let i = 0; i < menu.length; i++) {
      let item = menu[i];
      let image = menuImages[i];

      // Nur Items der aktuellen Kategorie hinzufügen
      if (item.category === category.key) {
        categoryContainer.innerHTML += getHtmlforMenuItem(item, image);
      }
    }
  }
}

// --------------------------
// WARENKORB LOGIK
// --------------------------

function renderBasket() {
  let basketItemsRef = document.getElementById("basket_items");

  let subtotal = 0;
  let delivery = 4.99;

  basketItemsRef.innerHTML = ""; // Vorherigen Inhalt löschen

  basket.forEach((item) => {
    subtotal += item.price * item.amount;
    basketItemsRef.innerHTML += getHtmlforBasket(item); // HTML pro Item einfügen
  });

  let total = subtotal + delivery;

  document.getElementById("basket_totals").innerHTML = getHtmlforBasketTotal(
    total,
    subtotal,
    delivery,
  );

  updateBuyButton(); // Button aktivieren/deaktivieren abhängig vom Inhalt
}

// Prüft, ob im Warenkorb Items vorhanden sind und aktiviert / deaktiviert den Kauf-Button
function updateBuyButton() {
  let basketItems = document.getElementById("basket_items");
  let buyBtn = document.getElementById("buy_now_btn");

  // Button wird deaktiviert, wenn Warenkorb leer
  buyBtn.disabled = basketItems.children.length === 0;
}

// --------------------------
// WARENKORB ACTIONS
// --------------------------

// Item zum Warenkorb hinzufügen
function addToBasket(itemName) {
  let item = menu.find((m) => m.name === itemName);
  if (!item) return;

  let basketItem = basket.find((b) => b.name === itemName);

  if (basketItem) {
    basketItem.amount++; // Menge erhöhen
  } else {
    basket.push({ ...item, amount: 1 }); // Neues Item hinzufügen
    basketItem = basket.find((b) => b.name === itemName); // nochmal holen
  }

  updateButton(itemName, basketItem.amount); // Buttontext anpassen
  renderBasket(); // Warenkorb aktualisieren
}

// Aktualisiert den Button im Menü (Text + Klasse)
function updateButton(itemName, amount) {
  let btn = document.getElementById(`btn-${itemName}`);
  if (!btn) return;

  // Aktueller Status im Button anzeigen
  btn.innerText = `Added (${amount})`;
  btn.classList.add("added");
}

// Button zurücksetzen (wenn Item aus Basket entfernt wird)
function resetButton(itemName) {
  let btn = document.getElementById(`btn-${itemName}`);
  if (!btn) return;

  btn.innerText = "Add to basket";
  btn.classList.remove("added");
}

// Menge im Basket verringern
function decreaseItem(itemName) {
  const item = basket.find((i) => i.name === itemName);
  if (!item) return;
  item.amount--;
  if (item.amount <= 0) {
    removeItem(itemName);
  } else {
    updateButton(itemName, item.amount);
    renderBasket();
  }
}

// Menge erhöhen
function increaseItem(itemName) {
  const item = basket.find((i) => i.name === itemName);

  if (item) {
    item.amount += 1;
    updateButton(itemName, item.amount); // Hinweis: hier wird aktuell nur Text geändert
  }
  renderBasket();
}

// Item komplett aus Basket entfernen
function removeItem(itemName) {
  basket = basket.filter((i) => i.name !== itemName);

  resetButton(itemName);
  renderBasket();
}

// --------------------------
// DIALOG / BESTELLUNG
// --------------------------

function showDialog() {
  let dialogTimeout;
  let dialog = document.getElementById("buy_dialog");

  dialog.showModal();

  dialogTimeout = setTimeout(closeDialog, 3000);

  basket = [];

  menu.forEach((item) => resetButton(item.name));

  renderBasket();
}

function closeDialog() {
  let dialog = document.getElementById("buy_dialog");

  dialog.classList.add("closing");

  setTimeout(() => {
    dialog.close();
    dialog.classList.remove("closing");
  }, 300);
}

// --------------------------
// AMOUNT BUTTONS MIT ICONS
// --------------------------

// Funktion um die Buttons für Menge zu aktualisieren
// Wenn Menge 1 → Mülleimer, sonst Minus
function updateAmountButton(itemName, amount) {
  let button = document.getElementById(`btn_${itemName}`);

  if (!button) return;

  if (amount === 1) {
    button.innerHTML = '<i class="fa fa-trash"></i>'; // Menge 1 → löschen
  } else {
    button.innerHTML = '<i class="fa fa-minus"></i>'; // Mehrere → Minus
  }

  // Menge neben Icon anzeigen
  button.innerHTML += ` ${amount}`;
}

function toggleBasket() {
  let basket = document.getElementById("basket");

  if (basket.style.display === "none" || basket.style.display === "") {
    basket.style.display = "block"; // Basket anzeigen
  } else {
    basket.style.display = "none"; // Basket ausblenden
  }
}
