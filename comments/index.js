const express = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())
app.use(cors())
const commentsById = {}
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments',(req,res)=>{
    const commentID = randomBytes(4).toString('hex')
    const {content}  = req.body
    const comments = commentsById[req.params.id] || []
    comments.push({id:commentID,content})
    commentsById[req.params.id]=comments
    console.log(commentsById)
    res.status(201).send(comments)

})

app.listen(4001,()=>{
    console.log("Server on 4001")
})