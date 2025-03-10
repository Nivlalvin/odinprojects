import "./about.css";

export default function loadAbout() {
    const aboutContent = document.createElement('div');
    aboutContent.classList.add('about')
    aboutContent.innerHTML = `
    <h1>About</h1>
    <p>Email: restaurant@gmail.com</p>
    <p>Phone: 0701101467</p>
    `;
    document.getElementById('content').appendChild(aboutContent)
}