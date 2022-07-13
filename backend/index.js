const express = require('express')
const app = express()
app.use(express.json());
const port = 5000
const mongoose = require("mongoose");

var cors = require('cors')

app.use(cors())

const mongoURI = "mongodb://localhost:27017/social?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = async ()=>{
  await mongoose.connect(mongoURI,()=>{
     console.log("successfull");
 })
}

connectToMongo();

//available routes

app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})