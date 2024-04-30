const express=require('express');
const mongoose = require("mongoose");
const cors=require("cors");
const userRoutes=require("./routes/User");
const movieRoutes=require("./routes/Movie");
require('dotenv').config();
const app=express();

app.use(express.json())
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/user',userRoutes)

app.use('/api/user',movieRoutes)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');

        // Start server
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is running on port ${process.env.PORT || 8080}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });
