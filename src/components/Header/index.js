import './style.css';

export const Header = (props) => {

    const {showMenu} = props;

    const element = document.createElement("header");

    if(showMenu) {
        element.innerHTML = `
        <div class="header__content container">
            <div class="site-logo"></div>
            <div class="navigation">
                <button class="nav-btn"></button>
                <nav class="rollout-nav nav-closed">
                    <a href="#home">domů</a>
                    <a href="#menu">menu</a>
                    <a href="#gallery">galerie</a>
                    <a href="#contact">kontakt</a>
                </nav>
            </div>
        </div>
        `

        const navElm = element.querySelector(".rollout-nav");

        const toggleMobileMenu = () => {
            navElm.classList.toggle("nav-closed")
        }

        navElm.addEventListener("click", toggleMobileMenu);

        const navBtnElm = element.querySelector(".nav-btn");
        navBtnElm.addEventListener("click", toggleMobileMenu);
    }

    else {
        element.innerHTML = `
        <header>
            <div class="header__content container">
                <div class="site-logo"></div>
                <nav class="inline-nav">
                    <a href="/">Hlavní stránka</a>
                </nav>
            </div>
        </header>
        `
    }

    return element;
}