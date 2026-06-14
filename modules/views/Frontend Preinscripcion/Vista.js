app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Aquí validarías contra tu base de datos (MySQL por ejemplo)
    if (email === "admin@universidad.edu" && password === "1234") {
        // Si es admin, renderiza o redirige a la vista admin
        res.render('admin', { usuario: email }); 
    } else if (email === "estudiante@universidad.edu" && password === "1234") {
        // Si es usuario común, renderiza o redirige a la vista usuario
        res.render('usuario', { usuario: email });
    } else {
        // Si falla, vuelve a renderizar el login pasando el mensaje de error
        res.render('login', { error: "Correo o contraseña incorrectos." });
    }
});