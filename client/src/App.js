import React from 'react'
import PostCreate from './PostCreate'
import PostList from './postList'
export default () =>{
    return (
        <div className="container">
        <h1>Blog App</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
        </div>
    )

}