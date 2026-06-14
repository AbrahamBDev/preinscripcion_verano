const db = require("./database.js");

const registroQuery = async (nombre,apellido,correo,contrasena) =>{

    const conn = await db.getConnection();
    const consulta = `INSERT INTO usuarios (nombre,apellido,correo,contrasena,rol_id) VALUES (?,?,?,?,1)`
    const query = await conn.query(consulta,[nombre,apellido,correo,contrasena]);
    await conn.end(); // Terminamos la conexion con la base de datos
    return query; // retornamos la query
}

module.exports = {registroQuery}
