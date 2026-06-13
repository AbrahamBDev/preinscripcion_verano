const express = require("express");
const router = express.Router();
const session = require("express-session");
const {isUser} = require("../middlewares/login_verification.js");


// Rutas de usuario

// -- Renderizamos la vista si entra a la ruta /registrar
router.get("/registrar", async (req,res) =>{
    console.log("- Renderizando vista /registrar");
    res.render("registro",{});
});


router.post("/registrar", async (req,res)=>{
    console.log("Registrando usuario..");
    console.log(req.body.nombre);
    console.log(req.body.password);

});


router.get("/iniciar_sesion", async (req,res) =>{
    res.send("Log: Se ha accedido a la ruta de iniciar sesion");
});

router.get("/home", isUser, async (req,res) => {
    res.send("Bienvenido de vuela, " + req.session.name);
})

module.exports = router;


