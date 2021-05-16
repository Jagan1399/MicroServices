import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default (props)=>{
    const [comments,setComments]=useState([])
    const getComments = async ()=>{
        console.log(props.postID)
        const commentsList = await axios.get(`http://localhost:4001/posts/${props.postID}/comments`)
        console.log(commentsList)
        setComments(commentsList.data)
    }
    useEffect(()=>{
        getComments()
    },[])

    const renderComments = comments.map(comment=>{
        return (
           <li key={comment.id}>{comment.content}</li>
        )
    })
    return (
        <ul>{renderComments}</ul>
    )
}