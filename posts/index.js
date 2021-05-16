const express = require('express')
const axios = require('axios')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const posts={}
app.use(bodyParser.json())
app.use(cors())


app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/posts',(req,res)=>{
    const id = randomBytes(4).toString('hex')
    const title = req.body.title
    posts[id]={id,title}
    console.log(posts)
    res.status(200).send(posts[id])
})


app.listen(4000,()=>{
    console.log("Server listening on port 4000")
})
