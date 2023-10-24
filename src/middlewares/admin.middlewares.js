export const verificarAdmin = (req, res, next) => {
    try {
        if (req.usuario) {
        let usuario = req.usuario;
        if (usuario.admin) {
            next();
        } else {
            res.status(400).json({code: 400, message:"No tiene permiso para acceder a esta página."});
        }
    } else {
        res.status(400).json({code: 400, message:"Debe iniciar sesión para ver esta página."});
    };
    } catch (error) {
        res.status(500).json({code: 500, message:"Ha ocurrido un error en el proceso de verificación."})
    }
};