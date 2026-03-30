function getHtmlforHeader() {
  return `
            <nav class="navbar">
            <div class="logo"> <img src="assets/icons/Logo.png" alt="Bestell App logo"></div>
            <div class="burger_menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    `;
}

function getHtmlforRestaurantHeader() {
  return `
            <img id="rund_burger" src="assets/icons/burgericon.png" alt="Restaurant Logo">
            <img id="name_restaurant_img" src="assets/icons/name restaurant.PNG" alt="Burger house">
            <img id="rating_img" src="assets/icons/rating.png" alt="rating">
            <p>The best of Burgers, Pizza and Greens all in one place.</p>
    `;
}

function getHtmlforSection(category) {
  return `
        <div class="section_title">
            <img src="${category.icon}" alt="${category.key} icon">
            <h2> ${category.title}</h2>
        </div>
        <div class="menu" id="menu_${category.key}"></div>
    `;
}

function getHtmlforMenuItem(item, image) {
  return `
                <div class="menu_item ${item.category}">
                <div class="border_radius">
                    <img src="${image.url}" alt="${image.alt}">
                </div>
                    <div class="menu_content">
                        <div class="menu_headerprice">
                            <h3>${item.name}</h3>
                            <span class="price">€ ${item.price.toFixed(2)}</span>
                        </div>
                        <p>${item.description}</p>
                        <button id="btn-${item.name}" class="add_btn" 
                        onclick="addToBasket('${item.name}')">Add to basket</button>
                </div>
            `;
}

function getHtmlforFooter() {
  return `
            <p>© copyright</p>
            <p>Imprint</p>
            <p>Cookie Preferences</p>
    `;
}

function getHtmlforBasket(item) {
  let decreaseIcon =
    item.amount === 1
      ? '<i class="fa fa-trash"></i>'
      : '<i class="fa fa-minus"></i>';
  let removeButtonHtml =
    item.amount > 1
      ? `<button class="remove_btn" onclick="removeItem('${item.name}')">
         <i class="fa fa-trash"></i>
       </button>`
      : "";
  return `
  
    <div class="basket_card">
        <div class="basket_top">
            <span>${item.amount} x ${item.name}</span>
            ${removeButtonHtml} 
            </button>
        </div>

        <div class="basket_bottom">
            <div class="controls">
                <button onclick="decreaseItem('${item.name}')">${decreaseIcon}</i></button>
                <span>${item.amount}</span>
                <button onclick="increaseItem('${item.name}')"><i class="fa fa-plus"></i></button>
            </div>
                <span>${(item.price * item.amount).toFixed(2)} €</span>
        </div>
    </div>
    `;
}

function getHtmlforBasketTotal(total, subtotal, delivery) {
  return `
    <div id="totals_section" class="totals">
        <div class="row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)} €</span>
        </div>
        <div class="row">
            <span>Delivery fee</span>
            <span>${delivery.toFixed(2)} €</span>
        </div>
    <hr>
        <div class="row total">
            <span>Total</span>
            <span>${total.toFixed(2)} €</span>
        </div>
    </div>

    <button id="buy_now_btn" onclick="showDialog()">
        Buy now (${total.toFixed(2)} €)
    </button>
  `;
}

function getHtmlforEmptyBasket() {
  return `
    <div id="empty_basket">
        <p>Nothing here yet.<br>Go ahead and choose something delicious!</p>
        <img src="assets/icons/basket.png" alt="shoping card">
    </div>
`;
}
