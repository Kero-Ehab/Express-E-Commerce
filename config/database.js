const mongoose = require('mongoose')

const dbConnection = () =>{
   
   mongoose.connect(process.env.MONGO_URI).then((conn) =>{
       console.log(`Database connected: ${conn.connection.host}`)
   }).catch((err) =>{
       console.log(`DataBase Connection Error: ${err}`)
   })
   
}
module.exports = dbConnection;