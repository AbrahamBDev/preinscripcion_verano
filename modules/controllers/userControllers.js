const { Query } = require("pg");
const db = require("../models/database.js");// Importamos a la base de datos.
const {registroQuery} = require("../models/registroQuery.js"); 
const session = require("express-session");
// Lógica de ruta de usuario

const registrarController = async (req,res)=>{
    try{
        const {nombre, apellido, contrasena, contrasena2, correo} = req.body; // Obtenemos los campos de los input, los cuales, se reciben del objeto req.body, y aplicamos descontruccion.

        // - Realizamos las validaciones.

        if (!nombre || !contrasena || !contrasena2 || !correo){
            return res.render("registro",{error : "Hubo algun campo invalido"});
        }

        if (!(nombre.length > 3 || apellido.length > 3)){
            return res.render("registro",{error : "El nombre no debe contener menos de 3 caracteres"});
        }


        if (contrasena.length < 8 || contrasena2.length < 8){
            return res.render("registro",{error : "La contraseña debe tener mas de 8 caracteres"});
        }

        if (contrasena != contrasena2){
            return res.render("registro",{error : "Las contraseñas no coinciden"});
        }

        // Despues de que todo este bien, procedemos a la insercion de la nueva cuenta.
        const query = await registroQuery(nombre,apellido,correo,contrasena);
  
        console.log("Usuario creado: ");
        console.log(query.insertId); // Al ejecutar una consulta, esta devuelve como objeto metadatos. Y entre ellos esta el campo insertId; el cual almacena la id que tiene el objeto dentro de la tabla.
        
        // Creamos la sesion guardando datos en session.
        
        req.session.userId = Number(query.insertId); // guardamos el id del usuario
        req.session.rol = "usuario"; // guardamos su rol

        res.redirect("/home");
        
    }catch(err){
        console.log("Ha ocurrido un error.");
        console.log(err);
    
    }
} 

module.exports = {registrarController};