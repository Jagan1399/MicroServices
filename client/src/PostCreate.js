import React,{useState} from 'react'
import axios from 'axios'

export default ()=>{
    var [title,setTitle] = useState('')
    const onSubmit = async (event)=>{
        event.preventDefault()
        console.log(title)
        await axios.post('http://localhost:4000/posts',{title})
        setTitle('')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="mb-3 ml-3">
                    <label>Title</label>
                    <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )    
}


