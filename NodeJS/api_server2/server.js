const express = require('express')

const app = express()

const db = require('./db')

app.get('/',async(req,res) => {
    res.send('ok')
})

app.post('/api/register',async(req,res) => {
    res.send('register')
})

app.listen(3001,()=>{
    console.log('http://localhost:3001');   
}) 