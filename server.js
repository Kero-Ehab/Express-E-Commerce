const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: 'config.env'});
const morgan = require("morgan");
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const ApiError = require('./utils/apiError')
const globalError = require('./middlewares/errorMiddleware')



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


// // Global error handling middleware
// app.use((err, req, res, next) =>{
//     if(err.name === 'CastError'){
//         const err = new ApiError(`Invalid category id format`, 400)
//     }
//     res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message
//     })
// })

app.use((req, res, next) =>{
    next(new ApiError(`Canot find this rout ${req.originalUrl}`, 404))
})

app.use(globalError)



const PORT = process.env.PORT || 8000
const server = app.listen( PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})



process.on('unhandledRejection', (err) =>{
    console.log(`UnhandledRejection Error: ${err.name} | ${err.message}`)
    server.close(()=>{
        console.log('Shutting down...')
        process.exit(1)
    })
})