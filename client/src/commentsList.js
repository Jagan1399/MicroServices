import React,{useState,useEffect} from 'react'

export default ({comments})=>{
    
    // const getComments = async ()=>{
    //     console.log(props.postID)
    //     const commentsList = await axios.get(`http://localhost:4001/posts/${props.postID}/comments`)
    //     console.log(commentsList)
    //     setComments(commentsList.data)
    // }
    // useEffect(()=>{
    //     getComments()
    // },[])
    

    const renderComments = comments.map(comment=>{
        let content
        // if(comment.status === 'approved')
        // {
        //     content = comment.content
        // }
        // if(comment.status === 'pending')
        // {
        //     content = "This comment is pending moderation"
        // }
        // if(comment.status === 'rejected')
        // {
        //     content = "This comment has been rejected"
        // }
        switch (comment.status) {
            case "approved":
                content = comment.content 
                break;
            case "rejected":
                content = "This comment has been rejected"
                break;
            case "pending":
                content = "This comment is pending moderation" 
                break;
            default:
                break;
        }
        return (
           <li key={comment.id}>{content}</li>
        )
    })
    return (
        <ul>{renderComments}</ul>
    )
}