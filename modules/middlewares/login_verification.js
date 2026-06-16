const db = require("../models/database.js"); // Obtenemos el pool de la base de datos
const session = require("express-session");

// Funcion para verificar si el usuario esta en la base de datos
const isUser = async (req,res,next) =>{
    console.log("- Se ha entrado a la verificacion de usuario");
    if (req.session.rol != "usuario"){ // Si no es usuario, redirijir a la ruta de administrador.
        return res.redirect("/admin/dashboard");
    }else{
        next(); // si es usuario, entonces, continuar.
    }
}


const isAdmin = async (req,res,next) =>{
    console.log("- Se ha entrado a la verificacion de admin");
    if (!req.session || !req.session.userId){ // verificamos si la sesion es invalida
        console.log("No se ha detectado ninguna sesion. Inicie sesion nuevamente.")
        return res.render("inicio_sesion",{error: "No hay una sesion activa. Ingrese sesion nuevamente"});
    }
    if (req.session.rol != "admin"){ // si no es administrador, redirijir a la ruta de usuario
        return res.redirect("/principal");
    }else{
        next();
    }
}

const isLogged =  async (req,res,next) =>{
    console.log("Estas dentro de isLogged")
    if (req.session && (req.session.rol == "usuario" || req.session.rol == "admin")){
        console.log("Error: se encuentra una sesion activa");
        if (req.session.rol == "usuario"){
            return res.redirect("/principal");
        }else{
            return res.redirect("/admin/dashboard");
        }
    }else{
        // no esta logeado
        next();
    }
}



module.exports = {isUser, isLogged, isAdmin} // Exportamos las funciones




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