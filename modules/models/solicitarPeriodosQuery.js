const db = require("./database.js");

const solicitarPeriodos = async (offset) =>{
    let conn;
    try{
        //Creamos conexion con la base de datos;
        conn = await db.getConnection();

        // Creamos la consulta
        const query = `SELECT p.id AS periodoId,DATE_FORMAT(p.fecha_comienzo, "%Y-%m-%d") as fechaComienzo, DATE_FORMAT(p.fecha_final,"%Y-%m-%d") as fechaFinal, p.nombre AS periodoNombre, p.periodo AS periodoCodigo, ep.nombre AS estadoPeriodo FROM periodos AS p JOIN estado_periodo AS ep ON (p.estado_id = ep.id) ORDER BY periodoId DESC LIMIT ? OFFSET ?`;

        // Realizamos la consulta.

        const rows = await conn.query(query,[10,offset]);

        // Consultamos la cantidad de periodos existentes para saber cuantas paginas existiran.
        const queryPaginas = await conn.query("SELECT COUNT(*) as paginasTotales FROM periodos",[]);
        const totalRegistros = parseInt(queryPaginas[0].paginasTotales); // Parseamos de bigint a int
        const totalPaginas = Math.ceil(totalRegistros / 10);
        // creamos un nuevo objeto con los datos necesarios para el frontend
        const datos = {
            rows, totalRegistros, totalPaginas
        }

        console.log(datos);

        conn.end();

        return datos; // retornamos el vector de objetos resultantes. Ya que, las consultas que realizamos a la base de datos, vienen en forma de vector.

    }catch(err){
        console.log("Ha ocurrido un error");
        console.log(err);
        if (conn){
            conn.end() // Terminamos la conexion si se interrumpio en algun punto y no cerró.
        }
        return false;
    }
};


const existePeriodoAbierto = async () =>{
    let conn;
    try{
        conn = await db.getConnection();
        const query = `SELECT p.periodo as codigo, p.nombre as nombre, e.nombre as estado FROM periodos AS p JOIN estado_periodo AS e ON (e.id = p.estado_id) WHERE e.nombre = "activo"`;
        const resultado = await conn.query(query,[]);
        console.log("Periodos encontrados:");
        console.log(resultado)
        console.log(resultado.length);
        await conn.end(); // terminamos la conexion para dejarle el puerto libre a los demas usuarios que quieran solicitar los periodos.

        return resultado;
        

    }catch(err){
        console.log("Ha ocurrido un error al verificar los periodos;");
        console.log(err);
        throw err;
    }
}

const existeColisionFechas = async (fechaComienzo, fechaFinal)=>{
    let conn; // declaramos en el scope una variable que se encargara de almacenar la conexion
    try{   
        conn = await db.getConnection();
        const query = `SELECT COUNT(*) as total FROM periodos AS p WHERE (p.fecha_comienzo <= ? and p.fecha_final >= ?)`;
        const resultado = await conn.query(query,[fechaFinal,fechaComienzo]);
        await conn.end();
        console.log("Resultados obtenidos:");
        console.log(resultado);
        return parseInt(resultado[0].total); // devolvemos el campo total del objeto del vector resultante

     }catch(err){
        console.log("Ha ocurrido un error al chequear las colisiones de fechas");
        console.log(err);
        if (conn){
            await conn.end() // Terminamos la conexion si se interrumpio en algun punto y no cerró.
        }
        throw err; // arrojamos un error controlado
     }
    
}



module.exports = {solicitarPeriodos, existePeriodoAbierto, existeColisionFechas};