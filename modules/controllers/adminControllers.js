const {solicitarPeriodos,solicitarPeriodoParaImpresion,solicitarPeriodo,obtenerInscripcionesPeriodo, existePeriodoAbierto,existeColisionFechas} = require("../models/solicitarPeriodosQuery.js");
const {insertarPeriodo} = require("../models/insertarPeriodoQuery.js");
const {cerrarPeriodoQuery} = require("../models/cerrarPeriodoQuery.js");
const solicitudPeriodos = async (req,res)  =>{
    try{
       
        const rows = await solicitarPeriodos();
    
        res.json(rows); // enviamos los datos en forma de json.
    }catch(err){
        res.status(500).json({error : "Hubo un error al obtener los datos"});
    }
}


const nuevoPeriodo = async (req,res,next)  =>{
    try {
        //Tomamos los datos que recibimos del formulario del front-end
        const {nombre,periodo,fechaFinal,fechaComienzo} = req.body;

        // verificamos si existe un periodo activo antes de la subida (Para evitar errores)
        const periodoActivo = await existePeriodoAbierto();
        console.log("Lo que he recibido:")
        console.log(periodoActivo);
        console.log("----");
        
        if (periodoActivo.length == 0){
            // como no hay periodo activo, tomamos nuestras entradas, creamos una conexion con la base de datos, y los enviamos.
            if (!nombre || !periodo || !fechaComienzo || !fechaFinal){
                return res.render("nuevo_periodo", {tipo : "error", mensaje: "Hubo un error con alguno de los campos. Chequee y vuelva a internar"});
            }

            if (nombre.trim().lenght == 0){
                return res.render("nuevo_periodo", {tipo : "error", mensaje: "El campo nombre no puede estar vacio"});
            }

            if (periodo.trim().lenght == 0){
                return res.render("nuevo_periodo", {tipo : "error", mensaje: "El campo periodo no puede estar vacio"});
            }
            // Obtenemos las fechas
            const FechaFinalFormat = new Date(fechaFinal);
            const FechaComienzoFormat = new Date(fechaComienzo);

            if ((FechaComienzoFormat >= FechaFinalFormat)){
                return res.render("nuevo_periodo", {tipo:"error", mensaje : "La fecha de comienzo no puede ser superior a la fecha de cierre"})
            }

            // En el caso de que pase todas sus validaciones, procederemos a insertar en la base de datos el nuevo periodo

            const periodoFechas = await existeColisionFechas(fechaComienzo,fechaFinal);

            if (periodoFechas > 0){
                return res.render("nuevo_periodo",{mensaje:"Error. Las fechas del periodo colisionan con las fechas de otros periodos", tipo:"error"});
            }

            const insercion = await insertarPeriodo(nombre,periodo,fechaFinal,fechaComienzo);

            if (insercion){
                res.render("dashboard",{mensaje:"Periodo creado con exito!", tipo:"success"});
            }else{
                res.render("dashboard",{mensaje:"Hubo un error al crear el periodo", tipo:"error"});
            }
            
        }else{
            // si en dado caso, no es posible crear un periodo porque hay alguno activo, vamos a redirijir y lanzar error.
            return res.render("dashboard",{mensaje:"No es posible crear un periodo cuando existe uno activo.", tipo:"error"});
        }


        
    }catch (err) {
        console.log("Ha ocurrido un error al crear el nuevo periodo");
        console.log(err);
        return res.render("dashboard",{mensaje:"Hubo un error al crear el periodo.", tipo:"error"});

    }
}

const cerrarPeriodoVista = async (req,res) => {
    try{
        // Tomamos la id del periodo que viene en el req
        const periodoId = req.params.id;

        if (!periodoId){ 
            return res.render("dashboard",{tipo:"error", mensaje:"El periodo a cerrar no existe"});
        }

        const registro = await solicitarPeriodo(periodoId);
        
        if (registro.length == 0){
            return res.render("dashboard",{tipo:"error", mensaje:"No se encontro ningun periodo"});
        }

        const periodo = registro[0]; // Obtenemos solo el primer registro del arreglo
        console.log("periodo a cerrar:");
        console.log(periodo);
        res.render("cerrar_periodo",{periodo});

    }catch(err){
        console.log("Ha ocurrido un error al cerrar un periodo.");
        console.log("Mas informacion en:");
        console.log(err);
        return res.render("dashboard",{tipo:"error", mensaje:"Ha ocurrido un error al obtener el periodo."});
    }

}

const cerrarPeriodoController = async (req,res) => {
    try{
        // Obtenemos el id del periodo a cerrar:
        const periodoId = req.body.periodoId;
        console.log("Ha entrado a cerrar periodo controller");
        console.log(periodoId);
        if (!periodoId){
            return res.render("dashboard",{tipo:"error", mensaje:"Ha ocurrido un error al cerrar el periodo"});
        }

        await cerrarPeriodoQuery(periodoId);

        console.log("El periodo ha sido cerrado.");
        
        res.render("dashboard",{tipo:"success", mensaje:"El periodo se ha cerrado con exito"});

    }catch(err) {
        console.log("Ha ocurrido un error al cerrar un periodo.");
        console.log("Mas informacion en:");
        console.log(err);
        return res.render("dashboard",{tipo:"error", mensaje:"Ha ocurrido un error al"});
    }


}


const imprimirPeriodo = async (req,res) => {
    
    try {
        const periodoId = req.params.id // Obtenemos el id del periodo
         // Tomamos la id del periodo que viene en el req
        if (!periodoId){ 
            return res.render("dashboard",{tipo:"error", mensaje:"No es posible obtener la consulta de las inscripciones"});
        }

        const inscripciones = await obtenerInscripcionesPeriodo(periodoId);
        const periodo = await solicitarPeriodoParaImpresion(periodoId);
        console.log("LOS DATOS OBTENIDOS SON:");
        console.log(periodo);

        const codigoPeriodo = periodo[0].periodoNum;
      
        
        if (!inscripciones){
            return res.render("dashboard",{tipo:"error", mensaje:"Hubo un error al obtener las inscripciones"});
        }

        if (!periodo){
            return res.render("dashboard",{tipo:"error", mensaje:"el periodo no existe"});
        }

        /*
        if (inscripciones.lenght == 0){ 
            return res.render("dashboard",{tipo:"error", mensaje:"No se encontro ninguna inscripcion a el periodo dado"});
        }
        */

        console.log("renderizando....");
        res.render("impresion_total", {inscripciones, periodo : codigoPeriodo});

    } catch (error) {
        console.log("Ha ocurrido un error.");
        console.log(error);
        return res.render("dashboard",{tipo:"error", mensaje:"Hubo un error al intentar obtener la consulta"});
    }


}

module.exports = {solicitudPeriodos,nuevoPeriodo,cerrarPeriodoVista,cerrarPeriodoController,imprimirPeriodo};