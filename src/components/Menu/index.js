import './style.css';

import { Drink } from './components/Drink/index.js';

export const Menu = (props) => {

  const {drinks} = props;

    const element = document.createElement("section");
    element.classList.add("menu");
    element.setAttribute("id", "menu");

    element.innerHTML = `
    <div class="container">
        <h2>Naše nabídka</h2>
        <p class="menu-intro">
        Vyberte si z našeho interaktivního menu a nemusíte čekat na obsluhu
        </p>

        <div class="drinks-list"></div>
        
    </div>
    `

    //Order detail button
    const orderDetail = document.createElement("div");
    orderDetail.classList.add("order-detail");
  
    orderDetail.innerHTML = `
    <a href="/objednavka">Detail objednávky</a>
    `
    element.querySelector(".container").append(orderDetail)

    if(drinks === "loading") {

      fetch(`https://cafelora.kodim.app/api/me/drinks`, {
        method: 'GET',
        headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(response => response.json())
      .then(data => {
        data.result.map(drinks => {

          const {id, name, ordered, image, layers} = drinks;
          
          const oneDrink = Drink({
            id: id,
            name: name,
            ordered: ordered,
            image: image,
            layers: layers,
          });

          element.querySelector(".drinks-list").append(oneDrink);
        })
      })

    }

    return element;
}
