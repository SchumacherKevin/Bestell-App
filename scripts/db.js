let menu = [
  {
    "category": "burger",
    "name": "Classic Cheeseburger",
    "price": 8.99,
    "description":
      "Juicy beef patty with cheddar, lettuce, tomato, and homemade sauce",
    "amount": 0,
  },
  {
    "category": "burger",
    "name": "BBQ Bacon Burger",
    "price": 10.49,
    "description": "Beef patty with crispy bacon, BBQ sauce, and onions",
    "amount": 0,
  },
  {
    "category": "burger",
    "name": "Chicken Burger",
    "price": 9.49,
    "description":
      "Grilled chicken fillet with lettuce and honey mustard sauce",
    "amount": 0,
  },
  {
    "category": "burger",
    "name": "Veggie Burger",
    "price": 8.49,
    "description": "Plant-based patty with fresh vegetables and avocado cream",
    "amount": 0,
  },
  {
    "category": "pizza",
    "name": "Margherita",
    "price": 7.99,
    "description": "Classic pizza with tomato sauce, mozzarella, and basil",
    "amount": 0,
  },
  {
    "category": "pizza",
    "name": "Salami Pizza",
    "price": 9.49,
    "description": "Tomato sauce, mozzarella, and spicy salami",
    "amount": 0,
  },
  {
    "category": "pizza",
    "name": "Hawaii Pizza",
    "price": 9.99,
    "description": "With ham, pineapple, and cheese",
    "amount": 0,
  },
  {
    "category": "pizza",
    "name": "Vegetarian Pizza",
    "price": 9.29,
    "description": "With bell peppers, zucchini, mushrooms, and olives",
    "amount": 0,
  },
  {
    "category": "salad",
    "name": "Caesar Salad",
    "price": 7.49,
    "description":
      "Romaine lettuce with Caesar dressing, croutons, and parmesan",
    "amount": 0,
  },
  {
    "category": "salad",
    "name": "Greek Salad",
    "price": 7.99,
    "description": "Tomatoes, cucumbers, feta, olives, and olive oil",
    "amount": 0,
  },
  {
    "category": "salad",
    "name": "Chicken Salad",
    "price": 8.99,
    "description": "Mixed salad with grilled chicken and yogurt dressing",
    "amount": 0,
  },
  {
    "category": "salad",
    "name": "Avocado Salad",
    "price": 8.49,
    "description": "Fresh salad with avocado, nuts, and balsamic dressing",
    "amount": 0,
  },
];

let cart = [];

let menuImages = [
  { url: "./assets/img/classicCheeseburger.jpg", alt: "classic cheeseburger" },
  { url: "./assets/img/BBQBurger.jpg", alt: "BBQ Burger" },
  { url: "./assets/img/classicCheeseburger.jpg", alt: "chicken burger" },
  { url: "./assets/img/VeggierBurger.jpg", alt: "veggie burger" },
  { url: "./assets/img/margheritaPizza.jpg", alt: "margherita Pizza" },
  { url: "./assets/img/salamiPizza.jpg", alt: "salami Pizza" },
  { url: "./assets/img/hawaiiPizza.jpg", alt: "hawaii Pizza" },
  { url: "./assets/img/vegetarischePizza.jpg", alt: "vegetarische Pizza" },
  { url: "./assets/img/caesarSalad.jpg", alt: "caesar Salad" },
  { url: "./assets/img/greekSalad.jpg", alt: "greek Salad" },
  { url: "./assets/img/chickenSalad.jpg", alt: "chicken Salad" },
  { url: "./assets/img/avocadoSalad.jpg", alt: "avocado Salad" },
];

let categories = [
  {
    key: "burger",
    title: "Burger & Sandwiches",
    icon: "./assets/icons/catergoryBurger.png",
  },
  {
    key: "pizza",
    title: "Pizza (30cm)",
    icon: "./assets/icons/catergoryPizza.png",
  },
  { key: "salad", title: "Salad", icon: "./assets/icons/catergorySalad.png" },
];
