function init() {
  renderHeader();
  renderRestaurantHeader();
  renderMenu();
  emptyBasket();
  renderFooter();
  handleBasketVisibility();
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

function renderBasketTotal() {
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
  updateBuyButton();
  emptyBasket();
}

function updateBuyButton() {
  let basketItems = document.getElementById("basket_items");
  let buyBtn = document.getElementById("buy_now_btn");

  buyBtn.disabled = basketItems.children.length === 0;
}

function addToBasket(itemName) {
  let menuItem = menu.find((menuEntry) => menuEntry.name === itemName);
  if (!menuItem) return;

  let basketEntry = basket.find((basketItem) => basketItem.name === itemName);

  if (basketEntry) {
    basketEntry.amount++;
  } else {
    basket.push({ ...menuItem, amount: 1 });
    basketEntry = basket.find((basketItem) => basketItem.name === itemName);
  }

  updateButton(itemName, basketEntry.amount);
  renderBasketTotal();
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
  const basketEntry = basket.find((basketItem) => basketItem.name === itemName);
  if (!basketEntry) return;

  basketEntry.amount--;

  if (basketEntry.amount <= 0) {
    removeItem(itemName);
  } else {
    updateButton(itemName, basketEntry.amount);
    renderBasketTotal();
  }
}

function increaseItem(itemName) {
  const basketEntry = basket.find((basketItem) => basketItem.name === itemName);

  if (basketEntry) {
    basketEntry.amount += 1;
    updateButton(itemName, basketEntry.amount);
  }

  renderBasketTotal();
}

function removeItem(itemName) {
  basket = basket.filter((basketItem) => basketItem.name !== itemName);

  resetButton(itemName);
  renderBasketTotal();
}

function showDialog() {
  let dialogTimeout;
  let dialog = document.getElementById("buy_dialog");

  dialog.showModal();

  dialogTimeout = setTimeout(closeDialog, 3000);

  basket = [];

  menu.forEach((item) => resetButton(item.name));
  renderBasketTotal();
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
  const basket = document.getElementById("basket");

  if (window.innerWidth <= 768) {
    if (basket.hasAttribute("open")) {
      basket.removeAttribute("open");
      basket.style.display = "none";
    } else {
      basket.setAttribute("open", "");
      basket.style.display = "block";
    }
  }
}

function emptyBasket() {
  const basketRef = document.getElementById("basket_items");
  const totalsRef = document.getElementById("basket_totals");

  if (basket.length === 0) {
    basketRef.innerHTML = getHtmlforEmptyBasket();
    totalsRef.style.display = "none";
  } else {
    totalsRef.style.display = "";
    totalsRef.style.display = "";
  }
}

function handleBasketVisibility() {
  const basket = document.getElementById("basket");

  if (window.innerWidth > 768) {
    // Immer sichtbar (Desktop)
    basket.style.display = "block";
    basket.setAttribute("open", "");
  } else {
    // Mobile -> schließen
    basket.style.display = "none";
    basket.removeAttribute("open");
  }
}

window.addEventListener("resize", handleBasketVisibility);
