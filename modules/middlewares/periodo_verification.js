const {existePeriodoAbierto} = require("../models/solicitarPeriodosQuery");
const verificacionPeriodo = async (req,res,next)  =>{
    try {
        console.log("Ha elegido crear un nuevo periodo");
        const periodoActivo = await existePeriodoAbierto();

        if (periodoActivo.length != 0){
            console.log("Error: No es posible crear un periodo si uno esta activo");
            console.log("Periodo activo: ");
            console.log(periodoActivo);
            res.render("dashboard",{mensaje:"Existe un periodo activo",tipo : "error"});
        }else{
            // como no se detecto ninugn periodo, pasamos la verificacion.
            next();
        }

    }catch (err) {
        console.log("Ha ocurrido un error. No es posible verificar si un periodo se encuentra activo");
        res.render("/admin/dashboard",{error:"Hubo un error al crear un periodo"});
        
    }
}

module.exports = verificacionPeriodo;