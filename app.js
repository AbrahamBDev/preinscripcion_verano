require("dotenv").config(); // Obtenemos las claves de entorno
const express = require("express");
const app = express();
const port = Number(process.env.PORT); // obtenemos el puerto y lo parseamos a entero
const path = require("path");
const db = require("./modules/models/database.js");
const pool = require("./modules/models/database.js");
const session = require("express-session");

// -- Registro de sesion.
app.use(session({
    secret: "he_cometido_el_peor_de_los_pecados_que_un_hombre_puede_cometer_..._no_he_sido_feliz._que_los_glaciares_del_olvido_me_arrastren_despiadados.",
    saveUninitialized : false,
    resave : false, // para que no guarde sesiones repetidas
    cookie :{
        httpOnly : true, // 
        secure : false,  // Para indicar si tenemos un protocolo de https  
        maxAge : 1000 * 60 * 60 * 24 // 1000 milisegundos * 60 = 60 segundos. por lo que si se multiplica 60 segundos por 60 da como 60 minutos, ya que 60 segundos en un minuto, y un minuto por 60 son una hora
    }
}));



// - Usamos middlewares
app.use(express.json()); // Hacemos que los datos que reciba el express lo parsee a json.
app.use(express.urlencoded({ extended: true })); // Permitimos que permita recibir datos de formularios

// - Activamos el renderizador de vistas.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'modules/views')); // pasamos la ruta de nuestra carpeta modulos.
app.use(express.static(path.join(__dirname,"modules/public")));

// - Rutas

app.use("/",require("./modules/routes/user.js")) // - Inicio de sesion, registro.
app.use("/admin",require("./modules/routes/admin.js"));


// == Enrrutamiento
app.listen(port,()=>{ // El listen se encarga de escuchar y levantar el servidor.
    console.log("\n --- SISTEMA DE PREINSCRIPCION DE CURSOS ----\n");
    console.log("- Log: Sistema levantado");
    console.log("- Levantado en: ");
    console.log(port);
    console.log("\nNota: Para chequear. dirijase a el localhost del port");
});

