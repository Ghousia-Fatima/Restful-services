//to get data from HTML form through express App & store the same data into MongoDB

const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')

const PORT = process.env.PORT || 5000

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Accessing Static resources
app.use(express.static(path.join(__dirname, "public")))


//Database connection

mongoose.connect('mongodb://localhost:27017/NewUsers',{
    useUnifiedTopology: true,
    useNewUrlParser:true
})
.then(()=>console.log("Database Connected"))
.catch(()=>console.log ("Database not connected"))

// var db = mongoose.Mongoose.connection;

// db.on('error', ()=>console.loh("Error in connecting with Database"))
// db.on('open', ()=>console.log("Connected with Database...!!"))


// Routes

app.get('/', (req,res)=>{
    res.sendFile("index.html")
    
})

app.post('/api/register',(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const data = {
        name:name,
        email:email,
        password:password
    }

    const UserSchema = new mongoose.Schema(
        {
            name:{type:string, required:true},
            email:{type:string, required:true},
            password:{type:string}
    
        }
    )
    
    // 4. Creating a Model used as a collection 
    
    const UserModel = new mongoose.model("MyUsers", UserSchema)
    
    
    //5. Static data that you should send into database 
    const dataInDB = UserModel(data)
    
    dataInDB
    .save()
    .then(()=>console.log("Data Inserted into DB"))
    .catch((err)=>console.error(err))

    return res.send('<h1>Welcome $(data.name)!, your account has been created successfully</h1>')

    // db.collection('userdata').insertOne(data,(err, collection)=>{
    //     if (err)
    //     {
    //         throw err
    //     }
    //     else
    //     {
    //         console.log("Data inserted Successfully")
    //     }
    // });
    // return res.json({
    //     success:true,
    // })
})


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})


