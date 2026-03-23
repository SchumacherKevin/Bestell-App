function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function init() {
  renderMenu();
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
