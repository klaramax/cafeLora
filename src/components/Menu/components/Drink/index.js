import './style.css';

import { Layer } from '../Layer/index.js';

export const Drink = (props) => {

    const {id, name, ordered, image, layers} = props;

    let orderStatus = "";

    if(ordered) {
        orderStatus = "Zrušit";
    }
    else {
        orderStatus = "Objednat";
    }

    const element = document.createElement("div");
    element.classList.add("drink");

    element.innerHTML = `
    <div class="drink__product">
        <div class="drink__cup">
            <img src="${image}">
        </div>
        <div class="drink__info">
            <h3>${name}</h3>

        </div>
    </div>
    <div class="drink__controls">
        <button class="order-btn">
            ${orderStatus}
        </button>
    </div>
    `
    const orderBtn = element.querySelector(".order-btn");


    const orderDrink = () => {

        fetch(`https://cafelora.kodim.app/api/me/drinks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "ordered": !ordered
            }),
        })
        .then(response => response.json())
        .then(data => {

            const {id, name, ordered, image, layers} = data.result;

            element.replaceWith(Drink({
                id: id,
                name: name,
                ordered: ordered,
                image: image,
                layers: layers,
            }))
        });

    };

    orderBtn.addEventListener("click", orderDrink);

    if(ordered){
        orderBtn.classList.add("order-btn--ordered");
    }

    layers.map(layer => {
        const {color, label} = layer;

        const oneLayer = Layer({
            color: color,
            label: label,
        });

        element.querySelector(".drink__info").append(oneLayer);
    });

    return element;
}
