import "./home.css";

export default function loadHome() {
    const homeContent = document.createElement('div');
    homeContent.classList.add('home')
    homeContent.innerHTML = `
    <h1>Welcome to Divine Delicacies - Where every bite tells a story</h1>
    <p>At Divine Delicacies , we believe in using only the freshest ingredients to create unforgettable dishes tha celebrate the essence of food</p>
    <p>Experience the best culinary delights with us</p>
    `;
    document.getElementById('content').appendChild(homeContent);
}



