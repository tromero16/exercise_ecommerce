const url = `https://exerciseecommerce-production.up.railway.app`
const urlAux = `https://exerciseecommerce-production.up.railway.app/users`

//Login guardar id usuario en local storage, borrar con logout
//JSON.stringify() --> guardar usuario o id
//En la pagina del comercio comprobar si el usuario esta logueado en local storage, si no lo esta redirigir a login

const handleSubmit = async (e) => {

    e.preventDefault();
    let form = document.getElementById("login-form");
    let input_username = form["login-username"].value;
    let input_password = form["login-password"].value;
    
    let users = await getUsers();

    console.log(`Users after return: ${users}`);
    let user = users.find(user => (user.username === input_username && user.password === input_password));
    
    if(!user) {
        createAlert();
    } else {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "products.html"; //Enviar a pagina para cuentas, no al resto
    }

}

const createAlert = () => {
    // create a new div element

    $('#incorrect-login-alert').replaceWith(
        `<div class="col-12 alert alert-danger position-relative" id="incorrect-login-alert" role="alert">
            Nombre de usuario o contraseña incorrectos!
        </div>
        `
    );

    setTimeout(() => {
        $('#incorrect-login-alert').fadeOut()
    }, 2000);
}

const getUsers = async () => {

    try {
        users = (await axios.get(url+`/users`)).data;
        console.log(`Users before return: ${users}`)
        return users;

    } catch (error) {
        console.log(error)
    }
}

$( window ).on( "load", async function () {
//    users = axios.get(url+`/users`)
//    .then( response => {
       
//        console.log(`Users before return: ${response.data}`)
//        return response.data

//    } )
//    .catch( err => {
//        console.log(err)
//    } )
    $( '#submit_button' ).on("click",  await handleSubmit);
});

//<form onsubmit="handleSubmit(event)"> y en el js fucntion handleSubmit(e) { e.preventDefault(); ... }.

//form['valor-del-attributo-name-del-input']

//onsubmit