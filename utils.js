// Funcion para crear uuid's
function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        const r = (dt + Math.random()*16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (char === 'x' ? r :(r&0x3|0x8)).toString(16);
    });

    return uuid;
}

// Funcion para guardar elementos de JS en la memoria del navegador (persistencia en cliente)
localStorage.setItem("cart", [{
    amount: 3,
    price: 20,
    name: "JEDI T-shirt",
    productId: "f037125b-a337-da4c-adfa-b53717a8151e"
}]);

// Obtener un elemento de la memoria del navegador
const cart = localStorage.getItem("cart");

// Objeto que representa una compra
const purchase = {
    id: createUUID(),
    cart,
    total: 60
};