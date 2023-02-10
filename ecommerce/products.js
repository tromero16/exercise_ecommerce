var products = [
    {id:"1", title: "Manzana", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "https://biotrendies.com/wp-content/uploads/2015/06/manzana.jpg"},
    {id:"2", title: "Pera", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "http://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/26.jpg"},
    {id:"3", title: "Plátano", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "https://images.ecestaticos.com/hKyxfOUrnXiSYeK4-y5bZ_7kBnc=/0x0:1984x1511/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F3e5%2F860%2F45e%2F3e586045ef2130f61a45fdaa4b625bef.jpg"},
    {id:"4", title: "Kiwi", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "https://www.5aldia.es/es/wp-content/uploads/2017/09/kiwi.jpeg"},
    {id:"5", title: "Mango", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "https://www.agroponiente.com/wp-content/uploads/2021/08/mango-Agroponiente.png"},
    {id:"6", title: "Sandía", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "https://www.agroponiente.com/wp-content/uploads/2021/09/sandia-mini-Agroponiente.png"},
    {id:"7", title: "Melón", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "https://okdiario.com/img/recetas/2017/06/20/propiedades-de-melon.jpg"},
    {id:"8", title: "Arándanos", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "https://castrofruit.es/wp-content/uploads/2021/01/ARANDANOS.jpg"},
    {id:"9", title: "Frambuesa", price: 18, description: "Some quick example text to build on the card title and make up the bulk of the card's content.", imageLink: "http://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/29.jpg"}
];

const id_length = 1;

const eventHandlerPurchase = (cart) => {
  $('#purchase-button').on("click", function() {

    var purchase = JSON.parse(JSON.stringify(cart));  //Deep copying, sino ambas variables hacen referencia a la misma posición de memoria

    delete Object.assign(purchase[0], { id_purchase: purchase[0].id_cart })["id_cart"];

    $('#cart-dropdown-menu').empty().append(
      `
      <li>
        <h5>No hay productos en el carrito</h5>
      </li>
      `
    )
    localStorage.removeItem("cart");
  })
}
const displayProducts = (products) => {
  products.forEach(element => {
    $('#main-wrapper').append(
        `<article class="col-lg-4 col-md-6 col-xs-12 id=${element.id}">
        <div class="card">
          <div>
            <img
              src=${element.imageLink}
              class="card-img-top"
              alt=${element.title}
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">
                ${element.description}
            </p>
            <div class="add-more-less">
              <button type="button" class="btn add-minus" id="add-minus${element.id}">
                <i class="fa-solid fa-cart-shopping fa-2x"></i>
              </button>
              <input
                type="number"
                min="0"
                placeholder="0"
                class="item-count w-70"
                id="input${element.id}"
              />
              <button type="button" class="btn add-more" id="add-more${element.id}">
                <i class="fa-solid fa-cart-shopping fa-2x"></i>
              </button>
            </div>
            <div class="add-cart">
              <a href="#" class="btn btn-primary add-cart-button" id="add-cart${element.id}">Add to cart</a>
            </div>
          </div>
        </div>
      </article>`)
  });
}

const displayCart = (cart) => {
  $('#cart-dropdown-menu').empty();
  for(let i = 1; i < cart.length;i++) {
    let product = products.find(element => element.id === cart[i].prod_id);
    $('#cart-dropdown-menu').append(
      `<li class="row mx-0">
      <article>
        <div class="col-4 cart-image">
          <img
            src="${product.imageLink}"
            class="card-img-top"
            alt="manzana"
          />
        </div>
        <div class="col-8">
            <h5 class="cart-title">${product.title}</h5>
            <div class="cart-units">
                Unidades: ${cart[i].units}
            </div>
            <div class="cart-price">
                Precio total: ${cart[i].price}€
            </div>
        </div>
      </article>
    </li>
    <li><hr class="dropdown-divider" /></li>
    `
    )
  }
    if(document.getElementById("cart-total") == null) {
      $('#cart-dropdown-menu').append(
      `<li class="row mx-0" id="cart-total"><h5 class="my-0">Total price: ${cart[0].total_price}€</h5></li>
      `)
    } else {
      $('#cart-total').empty();
      $('#cart-dropdown-menu').append(
      `<li class="row mx-0" id="cart-total"><h5 class="my-0">Total price: ${cart[0].total_price}€ </h5></li>
      `);
    }
    $('#cart-dropdown-menu').append(

      `<li class="row mx-0"> 
        <button type="submit" class="btn btn-primary py-0" id="purchase-button"><h6 class="my-0 py-1">Purchase</h6></button>
      </li>      
      `);

      eventHandlerPurchase(cart);
           
  }

const getId = (id) => {
    return id_num = id.substr(id.length-id_length, id_length);
}

$( window ).on( "load",  function () {

  if (!localStorage.getItem("user")) {
    window.location.href = "login.html";
  }
  
  if (JSON.parse(localStorage.getItem("cart")) != null) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    displayCart(cart);
  
  } else {
    var cart = [{
      "id_cart": Math.floor(Math.random() * 20) + 11,
      "total_price": 0,
      "id_user": 0
    }]

    console.log(cart);

    $('#cart-dropdown-menu').append(
      `
      <li>
        <h5>No hay productos en el carrito</h5>
      </li>
      `
    )
  }
  displayProducts(products);

    $('.add-more').on("click", function () {
        let id = `input${getId(this.id)}`;
        document.getElementById(id).value++;  
    });

    $('.add-minus').on("click", function () {
        let id = `input${getId(this.id)}`;
        let element = document.getElementById(id);
        if(element.value > 0){
            element.value--;  
        } else {
            element.value = 0;  
        }
        
    });

    $('#logout-button').on("click", function () {
      localStorage.removeItem("user");
    });

    $('.add-cart-button').on("click", function () {
      

        const prod_id = getId(this.id);
        //console.log(typeof(document.getElementById(`input${prod_id}`).value))

        const units = Number(document.getElementById(`input${prod_id}`).value);
        
        const price = products.find(element => element.id === prod_id).price*units;
        
        console.log(cart)
        
        if(units > 0) {
          document.getElementById(`input${prod_id}`).value = null;

            let existing_element = cart.find(element => element.prod_id === prod_id);

            if (existing_element) {
              existing_element.units += units;
              existing_element.price += price;
            } else {
              let cart_element = {"prod_id":prod_id, "units":units, "price":price}; //El precio es el total de todos los productos del mismo tipo
              cart.push(cart_element);
            }
            
            cart[0].total_price = 0

            for(let i = 1; i<cart.length; i++) {
                cart[0].total_price += cart[i].price;
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart(cart);
        }
    });

    // $('#cart-dropdown').hover(function(){ 
    //     $('.dropdown-toggle', this).trigger('click'); 
    // });

    // $('#account-dropdown').hover(function(){ 
    //     $('.dropdown-toggle', this).trigger('click'); 
    // });
});