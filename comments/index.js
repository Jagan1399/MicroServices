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
    comments.push({id:commentID,content,status:'pending'})
    commentsById[req.params.id]=comments
    console.log(commentsById)
    await axios.post('http://localhost:4005/events',{type:"CommentCreated",data:{id:commentID,content,postID:req.params.id,status:'pending'}})
    res.status(201).send(comments)

})

app.post('/events',async (req,res)=>{
    console.log("Event received : "+req.body.type)
    const {type,data}=req.body
    if(type === "CommentModerated")
    {
        const {id,postID,status,content}=data
        console.log(data)
        const comments = commentsById[postID]
        const comment = comments.find(comment=> {return comment.id === id})
        comment.status = status
        await axios.post('http://localhost:4005/events',{
            type:"CommentUpdated",
            data:{
                id,status,postID,content
            }
        })
    }
    res.send({msg:"ok"})
})

app.listen(4001,()=>{
    console.log("Server on 4001")
})