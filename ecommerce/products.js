const url = `https://exerciseecommerce-production.up.railway.app`

const id_length = 36;

function createUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
      const r = (dt + Math.random()*16) % 16 | 0;
      dt = Math.floor(dt/16);
      return (char === 'x' ? r :(r&0x3|0x8)).toString(16);
  });

  return uuid;
}

const createCart = () => {
  let cart = [{
    "id_cart": createUUID(),
    "total_price": 0,
    "id_user": JSON.parse(localStorage.getItem("user")).id
  }];


  $('#cart-dropdown-menu').empty().append(
    `
    <li>
      <h5>No hay productos en el carrito</h5>
    </li>
    `
  )

  localStorage.setItem("cart", JSON.stringify(cart));
}

const eventHandlerPurchase = (cart) => {
  $('#purchase-button').on("click", function() {

    var purchase = JSON.parse(JSON.stringify(cart));  //Deep copying, sino ambas variables hacen referencia a la misma posición de memoria

    delete Object.assign(purchase[0], { id_purchase: purchase[0].id_cart })["id_cart"];
    purchase[0].id_purchase = createUUID(); 
    
    axios.post(url+`/purchases`, {purchase});

    localStorage.removeItem("cart");

    createCart();
    
  })
}
const displayProductsFilter = (products, category) => {
  $('#main-wrapper').empty();
  products.forEach(element => {
    if(element.tags.category === category) {
    $('#main-wrapper').append(
        `<article class="col-lg-4 col-md-6 col-xs-12" id="${element.id}">
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
    }
  });
  buttonsFunctionality(products);
}

const displayProducts = (products) => {
  products.forEach(element => {
    $('#main-wrapper').append(
        `<article class="col-lg-4 col-md-6 col-xs-12" id="${element.id}">
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
  buttonsFunctionality(products);
}

const displayCart = (products, cart) => {
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

const buttonsFunctionality = (products) => {

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
  $('.add-cart-button').on("click", function () {
      

    const prod_id = getId(this.id);

    const units = Number(document.getElementById(`input${prod_id}`).value);
    
    const price = products.find(element => element.id === prod_id).price*units;
    
    let cart = JSON.parse(localStorage.getItem("cart"));
    
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

        displayCart(products, cart);
    }
});

}

$( window ).on( "load",  async function () {

  const products = (await axios.get(url+`/products`)).data;

  if (!localStorage.getItem("user")) {
    window.location.href = "login.html";
  }
  
  if (JSON.parse(localStorage.getItem("cart")) != null && JSON.parse(localStorage.getItem("user")).id === JSON.parse(localStorage.getItem("cart"))[0].id_user) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    displayCart(products, cart);
  
  } else {
    createCart();
  }

  displayProducts(products);

    $('#logout-button').on("click", function () {
      localStorage.removeItem("user");
    });

    $('.navbar-button').on("click", function () {
      if (this.innerText === "Ver todo") {
        $('#main-wrapper').empty();
        displayProducts(products);
      } else {
        displayProductsFilter(products, this.innerText.toLowerCase());
      }      
    })

    

    // $('#cart-dropdown').hover(function(){ 
    //     $('.dropdown-toggle', this).trigger('click'); 
    // });

    // $('#account-dropdown').hover(function(){ 
    //     $('.dropdown-toggle', this).trigger('click'); 
    // });
});