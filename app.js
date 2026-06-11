const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;


app.get("/", (req,res) =>{
    res.send("Respuesta del server.");
});


app.listen(port,()=>{ // El listen se encarga de escuchar y levantar el servidor.
    console.log("\n --- SISTEMA DE PREINSCRIPCION DE CURSOS ----\n");
    console.log("- Log: Sistema levantado");
    console.log("- Levantado en: ",port);
    console.log("\nNota: Para chequear. dirijase a el localhost del port");
});

