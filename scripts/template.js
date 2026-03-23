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
                        <p class="price">€${item.price.toFixed(2)}</p>
                        <p>${item.description}</p>
                        <button type="button" class="add_btn">Add to basket</button>
                    </div>
                </div>
            `;
}
