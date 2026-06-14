const express = require("express");
const router = express.Router();
const session = require("express-session");
const {isUser, isLogged} = require("../middlewares/login_verification.js");
const {registrarController} = require("../controllers/userControllers.js");


// Rutas de usuario

// -- Renderizamos la vista si entra a la ruta /registrar
router.get("/registrar",isLogged, async (req,res) =>{
    console.log("- Renderizando vista /registrar");
    res.render("registro",{});
});


router.post("/registrar", isLogged, registrarController);

router.get("/iniciar_sesion", isLogged, async (req,res) =>{
    res.send("Log: Se ha accedido a la ruta de iniciar sesion");
});

router.get("/home", isUser, async (req,res) => {
    res.send("Bienvenido de vuela");
})

module.exports = router;


