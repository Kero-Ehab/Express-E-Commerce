const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: 'config.env'});
const morgan = require("morgan");
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');


// connecting with DB
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log(`Environment: ${process.env.NODE_ENV}`)
}

// Routes
app.use('/api/v1/categories', categoryRoute)

const PORT = process.env.PORT || 8000
app.listen( PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})