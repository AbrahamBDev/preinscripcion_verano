const db = require("../models/database.js"); // Obtenemos el pool de la base de datos


// Funcion para verificar si el usuario esta en la base de datos
const isUser = async (req,res,next) =>{
    console.log("Imagina un codigo asi bien cabron");
}


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