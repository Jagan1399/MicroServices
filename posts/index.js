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

app.post('/posts',async (req,res)=>{
    const id = randomBytes(4).toString('hex')
    const title = req.body.title
    posts[id]={id,title}
    console.log(posts)
    await axios.post('http://localhost:4005/events',{type:"PostCreated",data:posts[id]})
    res.status(200).send(posts[id])
})

app.post('/events',(req,res)=>{
    console.log(req.body)
    res.send({msg:"ok"})
})


app.listen(4000,()=>{
    console.log("Server listening on port 4000")
})
