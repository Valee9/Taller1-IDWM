// Importa jsonwebtoken para la generación y verificación de tokens JWT
import jwt from 'jsonwebtoken';
/**
 * Middleware para verificar y decodificar un token JWT presente en la cabecera de autorización de la solicitud.
 * Si el token es válido, el usuario verificado se agrega al objeto de solicitud (`req.user`) y se llama a la función `next` para continuar con la ejecución.
 * Si el token no es válido o está ausente, devuelve un código de estado 403 (Acceso denegado) o 500 (Error interno del servidor) en caso de error.
 * @function verifyToken
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware en la cadena.
 */
export const verifyToken = async (req,res,next) => {
    try{
        // Obtiene el token de la cabecera de autorización.
        let token = req.header("Authorization"); 
        // Verifica si el token está presente
        if(!token){
            return res.status(403).send("Access Denied");
        }
        // Elimina el prefijo "Bearer" si está presente en el token.
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }
        // Decodifica y verifica la validez del token usando la clave secreta del servidor.
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Agrega la información del usuario verificado al objeto de solicitud.
        req.user = verified;
        // Llama a la función `next` para continuar con la ejecución.
        next();
    } 
    catch (err) {
        // Manejo de errores: devuelve un código de estado 500 y un objeto de error en caso de error.
        res.status(500).json({ error: err.message});
    }
}