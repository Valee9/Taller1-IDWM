import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));

import clientRoutes from './routes/client.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';

app.use('/clients',clientRoutes);
app.use('/admin',adminRoutes);
app.use('/auth',authRoutes);

import clientModel from './models/client.js';
import adminModel  from './models/admin.js';

import { adminSeeds } from './seeders/admin.js';
import { clientSeeds } from './seeders/client.js';

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('connected', async() => {
  console.log('Conexión correcta a la base de datos');

  try {
    await adminModel.deleteMany();
    await adminModel.insertMany(adminSeeds),
    await clientModel.deleteMany();
    await clientModel.insertMany(clientSeeds),
    console.log('Datos cargados exitosamente en la base de datos');
  }
  catch (err) {
    console.error('Error al cargar los datos:', err);}
});

db.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
});

app.listen(PORT,() => console.log(`Server Port: ${PORT}`));