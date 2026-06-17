const express = require("express");
const router = express.Router();
const {solicitudPeriodos,nuevoPeriodo,cerrarPeriodoVista,cerrarPeriodoController} = require("../controllers/adminControllers.js");
const verificacionPeriodo = require("../middlewares/periodo_verification.js");
const {isAdmin} = require("../middlewares/login_verification.js");

// Menu principal del administrador
router.get("/dashboard", (req,res)=>{
    res.render("dashboard",{});
});

router.get("/nuevo_periodo",verificacionPeriodo,(req,res)=>{
    res.render("nuevo_periodo",{});
});

router.post("/nuevo_periodo",nuevoPeriodo);

router.get("/obtener_periodos",solicitudPeriodos);

router.get("/cerrar_periodo/:id",cerrarPeriodoVista);

router.post("/cerrar_periodo",cerrarPeriodoController);



module.exports = router;
