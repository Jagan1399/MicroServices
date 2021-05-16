const express = require('express')
const cors = require('cors')
const axios = require('axios')
const {randomBytes} = require('crypto')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())
app.use(cors())
const commentsById = {}
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments',async (req,res)=>{
    const commentID = randomBytes(4).toString('hex')
    const {content}  = req.body 
    const comments = commentsById[req.params.id] || []
    comments.push({id:commentID,content})
    commentsById[req.params.id]=comments
    console.log(commentsById)
    await axios.post('http://localhost:4005/events',{type:"CommentCreated",data:{id:commentID,content,postID:req.params.id}})
    res.status(201).send(comments)

})

app.post('/events',(req,res)=>{
    console.log(req.body)
    res.send({msg:"ok"})
})

app.listen(4001,()=>{
    console.log("Server on 4001")
})