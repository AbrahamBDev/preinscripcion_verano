const {solicitarPeriodos, existePeriodoAbierto} = require("../models/solicitarPeriodosQuery.js");
const {insertarPeriodo} = require("../models/insertarPeriodoQuery.js")
const solicitudPeriodos = async (req,res)  =>{
    try{
       
        console.log(req.query.page);

        const paginaActual = parseInt(req.query.page) || 1 // obtenemos el queryparams (Lo que viene despues del ?)
        //                          cada pagina tendra 10
        const offset = (paginaActual-1) * 10; // calculamos de donde empezará la busqueda con el fin de hacer el paginado
        const rows = await solicitarPeriodos(offset);
        
     
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

        if (!periodoActivo){
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

            if (!(fechaComienzoFormat => FechaFinalFormat)){
                return res.render("nuevo_periodo", {tipo:"error", mensaje : "La fecha de comienzo no puede ser superior a la fecha de cierre"})
            }

            // En el caso de que pase todas sus validaciones, procederemos a insertar en la base de datos el nuevo periodo

            const insercion = await insertarPeriodo(nombre,periodo,fechaFinal,fechaComienzo);

            if (insercion.insertId){
                res.render("dashboard",{mensaje:"Periodo creado con exito!", tipo:"sucess"});
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
    }
}

module.exports = {solicitudPeriodos,nuevoPeriodo};