const express = require("express");
const router = express.Router();
const session = require("express-session");
const {isUser, isLogged, isAdmin} = require("../middlewares/login_verification.js");
const {registrarController, iniciarSesionController, redireccionController} = require("../controllers/userControllers.js");


// Rutas de usuario

// -- Renderizamos la vista si entra a la ruta /registrar
router.get("/registrar",isLogged, async (req,res) =>{
    console.log("- Renderizando vista /registrar");
    res.render("registro",{});
});

router.get("/iniciar_sesion", isLogged, async (req,res) =>{
    console.log("- Renderizando vista /registrar");
    res.render("inicio_sesion",{});
});


router.post("/iniciar_sesion", isLogged, iniciarSesionController);

router.post("/registrar", isLogged, registrarController);

router.get("/home", isLogged, redireccionController);

router.get("/principal", isUser, async (req,res) => {
    res.send("Bienvenido de vuelta usuario");
})



// Exportamos la ruta para luego importarla en el otro modulo
module.exports = router;


