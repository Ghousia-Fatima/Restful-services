const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 5000

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes

app.get('/', (req,res)=>{
    res.send('Welcome to express JS server')
    
})

app.get('/about', (req,res)=>{
    res.send('<h1>This is About us Page</h1>')
})

app.get('/contact', (req,res)=>{
    res.send('<h1>This is contact us Page</h1>')
})

app.post('/', (req,res)=>{
    const data = req.body
    console.log(req.body)
    res.send(`<h1>Hello i am ${req.body.name} </h1>`)
})



app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})

