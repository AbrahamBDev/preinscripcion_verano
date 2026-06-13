const express = require("express");
const router = express.Router();
const session = require("express-session");


// Rutas de usuario

router.get("/registrar", async (req,res) =>{
    res.send("Log: Se ha accedido a la ruta de creacion de cuentas");
});



router.get("/iniciar_sesion", async (req,res) =>{
    res.send("Log: Se ha accedido a la ruta de iniciar sesion");
});

module.exports = router;


