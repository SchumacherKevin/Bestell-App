function getHtmlforSection(category) {
  return `
        <div class="section_title">
            <h2><img src="${category.icon}" alt="${category.key} icon"> ${category.title}</h2>
        </div>
        <div class="menu" id="menu_${category.key}"></div>
    `;
}

function getHtmlforMenuItem(item, image) {
  return `
                <div class="menu_item ${item.category}">
                    <img src="${image.url}" alt="${image.alt}">
                    <div class="menu_content">
                        <h3>${item.name}</h3>
                        <p class="price">€ ${item.price.toFixed(2)}</p>
                        <p>${item.description}</p>
                        <button type="button" class="add_btn" onclick="addToCart('${item.name}')">Add to basket</button>
                    </div>
                </div>
            `;
}

function getHtmlforHeader() {
  return `
            <nav class="navbar">
            <div class="logo"> <img src="assets/icons/Logo.png" alt="Bestell App logo"></div>
            <ul class="nav_links" id="navLinks">
                <li onclick="toggleMenu()"><a href="#">close</a></li>
                <li onclick="toggleMenu()"><a href="#">close</a></li>
                <li onclick="toggleMenu()"><a href="#">close</a></li>
                <li onclick="toggleMenu()"><a href="#">close</a></li>
            </ul>
            <div class="burger_menu" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    `;
}

function getHtmlforFooter() {
  return `
            <p>© copyright</p>
            <p>Imprint</p>
            <p>Cookie Preferences</p>
    `;
}

function getHtmlforRestaurantHeader() {
  return `
            <img src="assets/icons/burgericon.png" alt="Restaurant Logo">
            <h1>Burger House</h1>
            <p>The best of Burgers, Pizza and Greens all in one place.</p>
    `;
}

function getHtmlforBasket(item) {
  return `
    <div class="basket_card">
        
        <div class="basket_top">
            <span>${item.amount} x ${item.name}</span>
            <span>${(item.price * item.amount).toFixed(2)} €</span>
        </div>

        <div class="basket_bottom">
            <div class="controls">
                <button onclick="decreaseItem('${item.name}')">-</button>
                <span>${item.amount}</span>
                <button onclick="increaseItem('${item.name}')">+</button>
            </div>

                <button class="remove_btn" onclick="removeItem('${item.name}')">🗑</button>
        </div>

    </div>
    `;
}

function getHtmlforBasketTotal(total,subtotal,delivery) {
  return `
    <div class="totals">
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

    <button id="buy_now_btn">
        Buy now (${total.toFixed(2)} €)
    </button>
  `;
}
