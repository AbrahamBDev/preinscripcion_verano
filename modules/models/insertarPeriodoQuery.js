const db = require("./database.js");

const insertarPeriodo = async (nombre,periodo,fechaFinal,fechaComienzo) =>{
    try{
        const conn = await db.getConnection();
        const query = `INSERT INTO periodos (periodo,nombre,fecha_comienzo,fecha_final,estado_id) VALUES (?,?,?,?,1)`;
        const insercion = await conn.query(query,[periodo, periodo,fechaFinal,fechaComienzo]);
        console.log("El nuevo periodo se ha creado");
        console.log("Id de insercion: ", insercion.insertId);
        return insercion;

    }catch(err){
        console.log("Ha ocurrido un error al insertar un nuevo periodo");
        console.log(err);
        return false;
    }


}

module.exports = {insertarPeriodo}