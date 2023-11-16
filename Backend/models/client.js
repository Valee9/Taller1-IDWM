import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    nid: { type: String, unique: true, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    point: {  type: Number, required: true}
})

export default mongoose.model("Client",clientSchema);