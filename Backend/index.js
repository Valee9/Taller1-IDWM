import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

import clientRoutes from './routes/client.js';
import adminRoutes from './routes/admin.js';

app.use('/api/clients',clientRoutes);
app.use('/api/admins',adminRoutes);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("Database Connected!"))
.then(()=>{
    app.listen(PORT,() => console.log(`Server Port: ${PORT}`));

})
.catch((error) => console.log(`${error} did not connect`))