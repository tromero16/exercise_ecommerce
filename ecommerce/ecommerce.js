const url = `https://exerciseecommerce-production.up.railway.app`

const USERNAME_REGISTERED = 0;
const NOT_MATCHING_PASSWORD = 1;
const USERNAME_PASSWORD_LONGER = 2;
const LOGIN_ERROR = 3;

function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        const r = (dt + Math.random()*16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (char === 'x' ? r :(r&0x3|0x8)).toString(16);
    });
  
    return uuid;
  }


//Login guardar id usuario en local storage, borrar con logout
//JSON.stringify() --> guardar usuario o id
//En la pagina del comercio comprobar si el usuario esta logueado en local storage, si no lo esta redirigir a login

const handleSubmit = async (e) => {

    e.preventDefault();
    let form = document.getElementById("login-form");
    let input_username = form["login-username"].value;
    let input_password = form["login-password"].value;
    
    let users = await getUsers();

    let user = users.find(user => (user.username === input_username && user.password === input_password));
    
    if(!user) {
        createAlert(LOGIN_ERROR);
    } else {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "products.html"; //Enviar a pagina para cuentas, no al resto
    }

}

const handleSignup = async (e) => {

    e.preventDefault();

    let form = document.getElementById("signup-form");
    
    
    let input_username= form["signup-username"].value;
    let input_password=form["signup-password"].value;
    let input_password_rep= form["signup-password-rep"].value;
    

    let users = await getUsers();
    if (users.find(user => (user.username === input_username))) {
        createAlert(USERNAME_REGISTERED);
    } else if (input_password != input_password_rep) {
        createAlert(NOT_MATCHING_PASSWORD);
    } else if (input_password.length < 8 || input_username.length < 0){
        createAlert(USERNAME_PASSWORD_LONGER)
    } else {
        let user = {
        "id": createUUID(),
        "username": input_username,
        "password": input_password,
        "rol": "user"
        }
        await axios.post(url+`/users`, user);
        window.location.href = "login.html"
    }    
}

const createAlert = (num_alert) => {
    switch (num_alert) {
        case 0:
            $('#incorrect-login-alert').replaceWith(
                `<div class="col-12 alert alert-danger position-relative" id="incorrect-login-alert" role="alert">
                    Nombre de usuario ya existe!
                </div>
                `);
            break;

        case 1:
            $('#incorrect-login-alert').replaceWith(
                `<div class="col-12 alert alert-danger position-relative" id="incorrect-login-alert" role="alert">
                    Las contraseñas deben coincidir!
                </div>`)
          break;
        
        case 2:
            $('#incorrect-login-alert').replaceWith(
                `<div class="col-12 alert alert-danger position-relative" id="incorrect-login-alert" role="alert">
                    El usuario y la contraseña deben tener un mínimo de 8 caracteres!
                </div>`)
            break;
        default:
            $('#incorrect-login-alert').replaceWith(
                `<div class="col-12 alert alert-danger position-relative" id="incorrect-login-alert" role="alert">
                    Nombre de usuario o contraseña incorrectos!
                </div>
                `)
          break;
      }
      setTimeout(() => {
        $('#incorrect-login-alert').fadeOut()
    }, 2000);
    
}

const getUsers = async () => {

    try {
        users = (await axios.get(url+`/users`)).data;
        return users;

    } catch (error) {
        console.log(error)
    }
}

$( window ).on( "load", async function () {
    $( '#submit_button' ).on("click",  await handleSubmit);

    $( '#signin-text' ).on("click",  async function() {
        $('#login-form').replaceWith(
            `
            <form class="col-12 row" id="signup-form" onsubmit="handleSignup(event)">
                    <div class=" login-title">
                        <h1 class="text-primary">Crear una cuenta</h1>
                    </div>
                    
                    <div class="form-group row">
                      <label for="signup-username" class="col-sm-4 col-md-3 col-lg-2 col-form-label">Usuario</label>
                      <div class="col-sm-8 col-md-9 col-lg-10 px-0">
                        <input type="text" name="signup-username" class="form-control" id="signup-username" placeholder="Usuario">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="signup-password" class="col-sm-4 col-md-3 col-lg-2 col-form-label">Contraseña</label>
                      <div class="col-sm-8 col-md-9 col-lg-10 px-0">
                        <input type="password" name="signup-password" class="form-control" id="signup-password" placeholder="Password">
                      </div>
                    </div>
                    <div class="form-group row">
                        <label for="signup-password-rep" class="col-sm-4 col-md-3 col-lg-2 col-form-label">Repita la contraseña</label>
                        <div class="col-sm-8 col-md-9 col-lg-10 px-0">
                          <input type="password" name="signup-password-rep" class="form-control" id="signup-password-rep" placeholder="Password">
                        </div>
                      </div>

                    <a href="login.html">
                        <button type="submit" class="btn btn-primary" id="signup-button">Crear cuenta</button>
                    </a>                            
                </form>
            `
        )
        $( '#signup_button' ).on("click",  await handleSignup);
    });

});

//<form onsubmit="handleSubmit(event)"> y en el js fucntion handleSubmit(e) { e.preventDefault(); ... }.

//form['valor-del-attributo-name-del-input']

//onsubmit