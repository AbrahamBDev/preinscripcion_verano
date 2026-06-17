const db = require("./database.js");


const cerrarPeriodoQuery = async (id) =>{
    let conn;
    try{
        conn = await db.getConnection();
        const query = `UPDATE periodos set estado_id = 2 WHERE id = ?`;
        await conn.query(query,[id]);
        console.log("Se ha realizado la actualizacion del periodo");
        console.log("Se ha cerrado.");
    }catch(err){
        console.log(err);
        throw err; // retornamos el error
    }
};

module.exports = {cerrarPeriodoQuery};

