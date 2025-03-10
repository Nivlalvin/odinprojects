import "./styles.css";
import loadHome from "./modules/home";
import loadMenu from "./modules/menu";
import loadAbout from "./modules/about";

const content = document.getElementById('content');

function setUpTabs(){
    document.getElementById('home').addEventListener('click', () => {
        content.innerHTML = '';
        loadHome();
    });

    document.getElementById('menu').addEventListener('click', () => {
        content.innerHTML = '';
        loadMenu();
    });

    document.getElementById('about').addEventListener('click', () => {
        content.innerHTML = '';
        loadAbout();
    });
}


window.onload = () => {
    setUpTabs();
    loadHome();
    console.log("JS is running")
};