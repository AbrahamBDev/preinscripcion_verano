const db = require("./database.js"); // Importamos la base de datos

const verificarInicio = async (email,contrasena) =>{
    try{
        console.log("Verificando si el usuario tiene cuenta;")
        console.log("- Obteniendo conexion con la base de datos..");
        const conn = await db.getConnection();
        const queryCommand = `SELECT u.id, u.nombre, r.nombre FROM usuarios AS u JOIN roles AS r ON (u.rolId = r.id) WHERE u.correo = ? and u.contrasena = ?`;
        
        // realizamos la query;
        const rows = await conn.query(queryCommand,[email,contrasena]);
        
        if (rows)
        return rows;

        console.log("- Cerrando conexion.");
    }catch(err){
        
    }
}

module.exports = {};