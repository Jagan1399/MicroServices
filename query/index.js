const express = require('express')
const axios=require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const app=express()
app.use(bodyParser.json())
app.use(cors())
const posts = {}

const event_handler  =(type,data)=>{
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
}

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/events',(req,res)=>{
    const {type,data}=req.body
    
    event_handler(type,data)
    // console.log(posts)
    res.send({msg:"ok"})
}) 

app.listen(4002,async ()=>{
    console.log("Query on 4002")
    const res = await axios.get('http://localhost:4005/events')
    console.log(res.data)
    for(let event of res.data){
        console.log("Current Event : "+event.type)
        event_handler(event.type,event.data)
    }
})