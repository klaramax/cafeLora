import './style.css';

import { Home } from './pages/Home/index.js';

const appElm = document.querySelector("#app");
const { pathname } = window.location;

if(pathName === "/") {
    appElm.append(Home());
}
