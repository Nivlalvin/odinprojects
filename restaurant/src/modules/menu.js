import "./menu.css";

export default function loadMenu() {
    const menuContent = document.createElement('div');
    menuContent.classList.add('menu')
    menuContent.innerHTML = `
    <h1>Menu</h1>
    <p class="t">Check out our delicious offerings</p>
    `;

    const menuItems = [
        { name: "Cheeseburger", price: "$9.99", image: "cheeseburger.jpg" },
        { name: "Pepperoni Pizza", price: "$12.99", image: "pepperoni-pizza.jpg" },
        { name: "Caesar Salad", price: "$8.99", image: "caesar-salad.jpg" },
        { name: "Spaghetti Bolognese", price: "$14.99", image: "spaghetti-bolognese.jpg" },
        { name: "Chocolate Cake", price: "$6.99", image: "chocolate-cake.jpg" },
    ];

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('menu-card');
        card.innerHTML = `
        <img src="${item.image}" alt="${item.image}" class="menu-image">
        <h3 class="menu-name">${item.name}</h3>
        <p class="menu-price">${item.price}</p>
        `;
        cardContainer.appendChild(card);
    });

    menuContent.appendChild(cardContainer);

    document.getElementById('content').appendChild(menuContent);
}

