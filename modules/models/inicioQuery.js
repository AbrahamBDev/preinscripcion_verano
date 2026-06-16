const db = require("./database.js"); // Importamos la base de datos

const inicioQuery = async (email) =>{
    try{
        console.log("Verificando si el usuario tiene cuenta;")
        console.log("- Obteniendo conexion con la base de datos..");
        const conn = await db.getConnection(); // relizamos la conexion
        const queryCommand = `SELECT u.id as userId,u.nombre as userNombre, r.nombre as nombreRol, u.contrasena as contrasena FROM usuarios AS u JOIN roles AS r ON (u.rol_id = r.id) WHERE u.correo = ? `;
        
        // realizamos la query;
        const rows = await conn.query(queryCommand,[email]); // rellenamos el campo "?", con el fin de evitar inyecciones sql
        return rows;

        conn.end(); // terminamos la conexion.

        console.log("- Cerrando conexion.");
    }catch(err){
        console.log("Ha ocurrido un error");
        console.log(err);
    }
}

module.exports = {inicioQuery};