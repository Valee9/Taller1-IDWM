/**
 * Importación de la bilbioteca bcrypt para encriptar las contraseñas
 * y de dotenv para poder llamar las variavles de entornno
 */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
// Contraseña para generar el hash.
let password = "Jaqamain3pals";
// Genera un valor aleatorio para el proceso de hashing.
const salt = await bcrypt.genSalt();
// Genera el hash de la contraseña utilizando el algoritmo bcrypt.
const passwordHash = await bcrypt.hash(password,salt);
// Datos semillas del administrador.
export const adminSeeds = [
    {
        user: "Ochietto",
        password: passwordHash,
    },
];