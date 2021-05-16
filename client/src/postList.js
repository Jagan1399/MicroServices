import React,{useState,useEffect} from 'react'
import CommentsCreate from './CommentsCreate'
import CommentsList from './commentsList'
import axios from 'axios'
export default ()=>{
    const [posts,setposts]=useState({})
    const getPosts = async ()=>{
        const posts_list = await axios.get('http://localhost:4002/posts')
        console.log(posts_list.data)
        setposts(posts_list.data)
    }
    useEffect(()=>{
        getPosts()
    },[])

    const renderPosts = Object.values(posts).map(post=>{
        return (
            <div className="card" style={{width:"30%",marginBottom:"20px"}} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentsList comments={post.comments} />
                    <CommentsCreate postID = {post.id}/>
                </div>
            </div>
        )
    })
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}  
        </div>
    )
}