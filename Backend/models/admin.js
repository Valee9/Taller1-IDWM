// Importación del módulo de 'mongoose' para la base de datos de MongoDB
import mongoose from "mongoose";

//Esquema de datos para la colección 'Admin'
const adminSchema = new mongoose.Schema({
    user: { type: String, required: true },
    password: { type: String, required: true }
})

// Exportación del modelo Admin
export default mongoose.model("Admin",adminSchema);