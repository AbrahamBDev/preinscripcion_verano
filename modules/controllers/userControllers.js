const db = require("../models/database.js");// Importamos a la base de datos.
const {registroQuery} = require("../models/registroQuery.js"); 
const {inicioQuery} = require("../models/inicioQuery.js");
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

        // Redirijimos a le hogar del usuario
        res.redirect("/home");
        
    }catch(err){
        console.log("Ha ocurrido un error.");
        console.log(err);
    
    }
} 

const iniciarSesionController = async (req,res)=>{
    const {email, password} = req.body; // Obtenemos el usuario y contraseña
    /*
        Validamos de que los campos no llegasen vacios.
        esta es una tecnica maldita de javascript.
        Cuando escribimos solo el nombre de un dato, estamos verificando si esta
        lleno, o si esta undefinined. Si esta nula, es decir, undefined, se entiende
        de manera implicita que es falso, por ende, si queremos validar si es nulo,
        podemos negar ese falso para que sea verdadero con el operador de negacion "!"
        ya que, si no lo usamos, estamos validando si existe, pero no si no existe.
        seria una condicion totalmente distinta.
    */
    if (!email || !password){
        return res.render("inicioSesion",{error : "Rellene los campos para iniciar sesion"});
        // Nota, para que el flujo del programa se frene, para asegurar esa frenada, hacemos un return a nuestra instruccion. aunque devuelva undefinied, este se encarga de ejecutar y luego frenar el ciclo
    }

    const rows = await inicioQuery(email); 
    console.log(rows);

    if (rows.length == 0){
        return res.render("inicio_sesion", {error : "El correo no existe, pruebe de nuevo."});
    }
    
    // obtenemos los datos del registro.
    const passwordAccount = rows[0].contrasena;
    const rol = rows[0].nombreRol;
    const id = rows[0].userId;

    // verificamos si la contraseña no coinciden.
    if (password != passwordAccount){
        return res.render("inicio_sesion", {error : "La contraseña es invalida. Digitela nuevamente."});
    }

    // como no hubo ningun error, guardamos el inicio de sesion y deridijimos.

    console.log("- Inicio de sesion realizado por el usuario : " + rows[0].userNombre);
    req.session.userId = id;
    req.session.rol = rol;
    res.redirect("/home");

}

const redireccionController = async (req,res)=>{
    const rol = req.session.rol;
    if (rol){
        if (rol == "admin"){
            return res.redirect("/admin/dashboard");

        }else if(rol == "usuario"){
            return res.redirect("/principal");
        }
    }
};

const cerrarSesionController = (req,res)=>{
    console.log("- Ha elegido cerrar sesion");
    req.session.destroy((err) =>{

        if(err){
            console.log(err);
            console.log("Error, se encuentra una sesion activa. Redirijiendo a la vista principal");
            res.redirect("/home");
        }

        // removemos la cookie que guarda nuestros datos.
        res.clearCookie("connect.sid") // Ingresamos el nombre de nuestra cookie en la funcion clearCookie. En este caso, como no se le asignó ningun nombre, usamos el nombre predeterminado.

        res.redirect("/iniciar_sesion") // redirijimos;
    }); // destruimos la sesion

}


module.exports = {cerrarSesionController,registrarController, iniciarSesionController, redireccionController};