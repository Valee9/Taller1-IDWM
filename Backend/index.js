import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Worldddd')
})

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("Database Connected!"))
.then(()=>{
    app.listen(PORT,() => console.log(`Server Port: ${PORT}`));

})
.catch((error) => console.log(`${error} did not connect`))