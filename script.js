// function toggleMenu() {
//   document.getElementById("navLinks").classList.toggle("active");
// }

function init() {
  renderHeader();
  renderRestaurantHeader();
  renderMenu();
  renderCart();
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
  // Holt das HTML-Element, in dem die Warenkorb-Items angezeigt werden
  let basket = document.getElementById("basket_items");

  // Variable für die Zwischensumme (Summe aller Produkte)
  let subtotal = 0;

  // Feste Lieferkosten
  let delivery = 4.99;

  // Leert den aktuellen Inhalt des Warenkorbs im HTML,
  // damit er neu aufgebaut werden kann
  basket.innerHTML = "";

  // Geht jedes Item im Warenkorb durch
  cart.forEach((item) => {
    // Berechnet die Zwischensumme:
    // Preis * Menge wird aufaddiert
    subtotal += item.price * item.amount;

    // Fügt für jedes Item den entsprechenden HTML-Code ein
    // (kommt vermutlich aus einer separaten Funktion)
    basket.innerHTML += getHtmlforBasket(item);
  });

  // Berechnet den Gesamtpreis (Zwischensumme + Lieferkosten)
  let total = subtotal + delivery;

  // Aktualisiert den Bereich für die Gesamtkosten im HTML
  // und übergibt die berechneten Werte an eine Funktion,
  // die den passenden HTML-Code erzeugt
  document.getElementById("basket_totals").innerHTML = getHtmlforBasketTotal(
    total,
    subtotal,
    delivery,
  );
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
    // Die drei Punkte nennt man den Spread Operator, der alles aus diesem Objekt kopiert
    cart.push({ ...item, amount: 1 });
    // Danach das neue Element im Warenkorb finden und in cartItem speichern
    cartItem = cart.find((c) => c.name === itemName);
  }

  // Button für das hinzugefügte Produkt aktualisieren (ohne komplettes neu rendern)
  updateButton(itemName, cartItem.amount);

  // Nach jeder Änderung → Warenkorb neu anzeigen
  renderCart();
}

function updateButton(itemName, amount) {
  let btn = document.getElementById(`btn-${itemName}`);
  if (!btn) return;

  btn.innerText = `Added (${amount})`;
  btn.classList.add("added");
}

function resetButton(itemName) {
  let btn = document.getElementById(`btn-${itemName}`);
  if (!btn) return;

  btn.innerText = "Add to basket";
  btn.classList.remove("added");
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
  // Die Funktion entfernt ein Item mit einem bestimmten Namen aus dem Warenkorb,
  // indem sie alle anderen Elemente beibehält, und aktualisiert danach die Anzeige.
  cart = cart.filter((i) => i.name !== itemName);

  resetButton(itemName);
  renderCart();
}


function showDialog() {
  let dialogTimeout; // Variable speichert das Timeout, um es später abbrechen zu können
  const dialog = document.getElementById("buy_dialog"); // Das Dialog-Element holen
  dialog.style.display = "flex"; // Dialog sichtbar machen
  dialog.style.animation = "fadeIn 0.3s forwards"; // Fade-In Animation anwenden

  // Automatisch nach 3 Sekunden schließen
  dialogTimeout = setTimeout(closeDialog, 3000);
}


function closeDialog() {
  let dialogTimeout; // Variable speichert das Timeout, um es später abbrechen zu können
  const dialog = document.getElementById("buy_dialog"); // Dialog-Element holen
  dialog.style.animation = "fadeOut 0.3s forwards"; // Fade-Out Animation anwenden

  // Nach der Animation den Dialog unsichtbar machen
  setTimeout(() => {
    dialog.style.display = "none";
  }, 300); // 300ms entspricht der Dauer der Fade-Out Animation

  clearTimeout(dialogTimeout); // Sicherstellen, dass das automatische Schließen gestoppt wird
}
