const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app=express()
app.use(bodyParser.json())
app.use(cors())
const posts = {}
app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/events',(req,res)=>{
    const {type,data}=req.body
    if(type === "PostCreated"){
        const {id,title}=data
        posts[id]={id,title,comments:[]}
    }

    if(type === "CommentCreated"){
        const {postID,id,content,status} = data
        const post= posts[postID]
        post.comments.push({id,content,status})
    }

    if(type === "CommentUpdated"){
        const {postID,id,content,status} = data
        const post= posts[postID]
        const comment= post.comments.find(comment=>{return comment.id === id})
        comment.status=status
        comment.content=content
    }

    console.log(posts)
    res.send({msg:"ok"})
}) 

app.listen(4002,(req,res)=>{
    console.log("Query on 4002")
})