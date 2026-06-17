const db = require("./database.js");


const obtenerInscripcionesPeriodo = async (id) =>{
    let conn;
    try {
        conn = await db.getConnection(); 

        query = 
                `Select p.periodo as periodo ,m.codigo as codigo,m.nombre as nombre ,count(i.id_materia) as cantidad from inscripciones AS i
                JOIN periodos as p on (p.id = i.id_periodo)
                JOIN materias as m on (m.id = i.id_materia)
                WHERE i.id_periodo = ?
                GROUP BY m.nombre
        `;
        
        const inscripciones = await conn.query(query,[id]);
        console.log(inscripciones);

        await conn.end();
        return inscripciones;


    }catch (err) {
        console.log(err)
        if (conn){
            await conn.end();
        }
    }


}


const solicitarPeriodoParaImpresion = async (id) =>{
    let conn;
    try{
        conn = await db.getConnection();
        const query = `SELECT p.id as periodoId,p.periodo as periodoNum, e.nombre as estado FROM periodos as p JOIN estado_periodo as e on (e.id = p.estado_id) WHERE p.id = ?`;
        const periodo = await conn.query(query,id);
        await conn.end();
        return periodo;

    }catch(err){
        console.log("Ha ocurrido un error al obtener un periodo");
        if (conn){
            await conn.end();
        }
        throw err;
    }
}

const solicitarPeriodo = async (id) =>{
    let conn;
    try{
        conn = await db.getConnection();
        const query = `SELECT p.nombre as periodoNombre, p.id as periodoId,p.periodo as periodoNum, e.nombre as estado FROM periodos as p JOIN estado_periodo as e on (e.id = p.estado_id) WHERE p.id = ? and e.nombre = "activo"`;
        const periodo = await conn.query(query,id);
        await conn.end();
        return periodo;

    }catch(err){
        console.log("Ha ocurrido un error al obtener un periodo");
        if (conn){
            await conn.end();
        }
        throw err;
    }
}

const solicitarPeriodos = async () =>{
    let conn;
    try{
        //Creamos conexion con la base de datos;
        conn = await db.getConnection();

        // Creamos la consulta
        const query = `SELECT p.id AS periodoId,DATE_FORMAT(p.fecha_comienzo, "%Y-%m-%d") as fechaComienzo, DATE_FORMAT(p.fecha_final,"%Y-%m-%d") as fechaFinal, p.nombre AS periodoNombre, p.periodo AS periodoCodigo, ep.nombre AS estadoPeriodo FROM periodos AS p JOIN estado_periodo AS ep ON (p.estado_id = ep.id) ORDER BY periodoId DESC`;

        // Realizamos la consulta.

        const rows = await conn.query(query,[]);

        // creamos un nuevo objeto con los datos necesarios para el frontend
        const datos = {rows}

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



module.exports = {solicitarPeriodoParaImpresion,obtenerInscripcionesPeriodo,solicitarPeriodo,solicitarPeriodos, existePeriodoAbierto, existeColisionFechas, obtenerInscripcionesPeriodo};