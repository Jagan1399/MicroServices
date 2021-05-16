import React,{useState} from 'react'
import axios from 'axios'

export default (props)=>{
    var [content,setContent] = useState('')
    const onSubmit = async (event)=>{
        event.preventDefault()
        console.log(content)
        await axios.post(`http://localhost:4001/posts/${props.postID}/comments`,{content})
        setContent('')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="mb-3 ml-3">
                    <label>Comment</label>
                    <input className="form-control" value={content} onChange={e=>setContent(e.target.value)}/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )    
}


