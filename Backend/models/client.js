// Importación del módulo de 'mongoose' para la base de datos de MongoDB
import mongoose from "mongoose";

//Esquema de datos para la colección 'Client'
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    nid: { type: String, unique: true, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    point: {  type: Number, required: true}
})

// Exportación del modelo Client
export default mongoose.model("Client",clientSchema);