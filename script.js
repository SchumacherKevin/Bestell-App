function init() {
  renderHeader();
  renderRestaurantHeader();
  renderMenu();
  renderBasket();
  renderFooter();
}

function renderHeader() {
  let headerRef = document.getElementById("header_main");
  headerRef.innerHTML = getHtmlforHeader();
}

function renderRestaurantHeader() {
  let restHeaderRef = document.getElementById("restaurant_header");
  restHeaderRef.innerHTML = getHtmlforRestaurantHeader();
}

function renderFooter() {
  let footerRef = document.getElementById("footer_content");
  footerRef.innerHTML = getHtmlforFooter();
}

function renderMenu() {
  let menuContainer = document.getElementById("menu_box");

  for (let category of categories) {
    menuContainer.innerHTML += getHtmlforSection(category);

    let categoryContainer = document.getElementById(`menu_${category.key}`);

    for (let i = 0; i < menu.length; i++) {
      let item = menu[i];
      let image = menuImages[i];

      if (item.category === category.key) {
        categoryContainer.innerHTML += getHtmlforMenuItem(item, image);
      }
    }
  }
}

function renderBasket() {
  let basketItemsRef = document.getElementById("basket_items");

  let subtotal = 0;
  let delivery = 4.99;

  basketItemsRef.innerHTML = "";

  basket.forEach((item) => {
    subtotal += item.price * item.amount;
    basketItemsRef.innerHTML += getHtmlforBasket(item);
  });

  let total = subtotal + delivery;

  document.getElementById("basket_totals").innerHTML = getHtmlforBasketTotal(
    total,
    subtotal,
    delivery,
  );

  updateBuyButton(); // Button aktivieren/deaktivieren abhängig vom Inhalt
}

function updateBuyButton() {
  let basketItems = document.getElementById("basket_items");
  let buyBtn = document.getElementById("buy_now_btn");

  buyBtn.disabled = basketItems.children.length === 0;
}

function addToBasket(itemName) {
  let item = menu.find((m) => m.name === itemName);
  if (!item) return;

  let basketItem = basket.find((b) => b.name === itemName);

  if (basketItem) {
    basketItem.amount++;
  } else {
    basket.push({ ...item, amount: 1 }); 
    basketItem = basket.find((b) => b.name === itemName);
  }

  updateButton(itemName, basketItem.amount); // Buttontext anpassen
  renderBasket(); // Warenkorb aktualisieren
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

function increaseItem(itemName) {
  const item = basket.find((i) => i.name === itemName);

  if (item) {
    item.amount += 1;
    updateButton(itemName, item.amount);
  }
  renderBasket();
}

function removeItem(itemName) {
  basket = basket.filter((i) => i.name !== itemName);

  resetButton(itemName);
  renderBasket();
}

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

function updateAmountButton(itemName, amount) {
  let button = document.getElementById(`btn_${itemName}`);

  if (!button) return;

  if (amount === 1) {
    button.innerHTML = '<i class="fa fa-trash"></i>';
  } else {
    button.innerHTML = '<i class="fa fa-minus"></i>';
  }

}

function toggleBasket() {
  let basket = document.getElementById("basket");

  if (basket.style.display === "none" || basket.style.display === "") {
    basket.style.display = "block";
  } else {
    basket.style.display = "none";
  }
}
