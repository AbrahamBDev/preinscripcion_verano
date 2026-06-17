const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'mi-clave-secreta',
    resave: false,
    saveUninitialized: true
}));


const mapaMaterias = {
    "1": "Física II",
    "2": "Investigación de Operaciones",
    "3": "Estructuras Discretas II",
    "4": "Teoría de Sistemas"
};


app.post('/guardar-inscripcion', (req, res) => {
    const { materia1, materia2 } = req.body;

    if (!materia1 || !materia2) {
        return res.send("Por favor, selecciona ambas materias.");
    }


    req.session.inscripcion = {
        materia1: mapaMaterias[materia1],
        materia2: mapaMaterias[materia2],
        fecha: new Date().toLocaleDateString('es-ES'),
        periodo: "2026-3"
    };


    res.redirect('Confirmacion.html');
});


app.get('Confirmacion.html', (req, res) => {
    if (!req.session.inscripcion) {
        return res.redirect('inscripcion.html');
    }


    res.render('confirmacion', { datos: req.session.inscripcion });
    
});