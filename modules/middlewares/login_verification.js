const db = require("../models/database.js"); // Obtenemos el pool de la base de datos
const session = require("express-session");

// Funcion para verificar si el usuario esta en la base de datos
const isUser = async (req,res,next) =>{
    console.log("- Verificando usuario");
    if (!req.session.userId || !req.session || req.session.rol != "usuario"){ // verificamos si la sesion es invalida
        console.log("No se ha detectado ninguna sesion. Inicie sesion nuevamente.")
        res.send("No se ha detectado ninguna sesion");

    }else{
        // La sesion es valida
        next();
    }
}


const isAdmin = async (req,res,next) =>{
    console.log("- Verificando usuario");
    if ( !req.session ||!req.session.userId || req.session.rol != "admin"){ // verificamos si la sesion es invalida
        console.log("No se ha detectado ninguna sesion. Inicie sesion nuevamente.")
        res.send("No se ha detectado ninguna sesion");

    }else{
        // La sesion es valida
        next();
    }
}



module.exports = {isUser} // Exportamos las funciones




/*
    Middlewares:
    Para realizar un middlewares en express, cabe a resaltar que nosotros
    podemos pasar cuantos callbacks (funciones) como parametro en las rutas.
    Notese tambien como le pasamos como parametro (req,res,next)
    en donde req seran los datos que se reciban del usuario
    res es lo que le vamos a enviar a nosotros y por ultimo next, que es una 
    funcion que ejecutamos para avanzar al siguiente funcion dentro de la ruta.
    Es fundamental ejecutar next() cuando hayamos terminado, ya que, sin no lo hacemos
    el programa se congelará.

*/