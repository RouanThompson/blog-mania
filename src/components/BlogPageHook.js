import React, { useState } from 'react'
import CommentCard from './CommentCard'
import MakeComment from './MakeComment'
// import { Link } from 'react-router-dom'


const BlogPageHook = (props) => {

    // state = {
    //     showEditForm: false,
    //     id: props.blog.id,
    //     cover_image: props.blog.cover_image,
    //     title: props.blog.title,
    //     story: props.blog.story,
    //     likes: props.blog.likes,
    //     comments: props.blog.comments
    // }

    const [formData, setFormData] = useState({
        showEditForm: false,
        id: props.blog.id,
        cover_image: props.blog.cover_image,
        title: props.blog.title,
        story: props.blog.story,
        likes: props.blog.likes,
        comments: props.blog.comments
    })

    const renderComments = () => {
        console.log("blog ID", formData.id)
        let { comments } = props.blog
        comments.reverse()
        return comments.map(comment => <CommentCard key={comment.id} comment={comment} commentId={comment.id} blogId={props.blog.id} currentUser={props.currentUser} deleteCommentState={props.deleteCommentState} updateCommentState={props.updateCommentState} />)
    }

    //controlled inputs
    const formHandleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData({
            //keeps old data of initial state then overwrite whatever user is changing
            ...formData,
            [name]: value
        })
    }

    const toggleEditForm = (event) => {
        //render the edit form with previous values
        if (event) {
            event.preventDefault()
        }
        setFormData({
            //keeps old data of initial state then overwrite whatever user is changing
            ...formData,
            showEditForm: !formData.showEditForm
        })
    }

    const formHandlePatch = (event) => {
        event.preventDefault()

        let blog = {
            id: formData.id,
            cover_image: formData.cover_image,
            title: formData.title,
            story: formData.story,
            likes: formData.likes,
            comments: formData.comments
        }

        let id = props.blog.id
        fetch(`http://localhost:4000/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        })
            .then(r => r.json())
            .then(blogs => {
                props.updateBlogState(blogs)
            })
        toggleEditForm()
    }

    const handleEdit = () => {

        // let banner = "./think-2.png"
        console.log("in handleEdit title: ", formData.title)
        return (
            // <img src={banner} className="banner2" alt=""></img><br/>
            <div>
                <form onSubmit={formHandlePatch}>
                    <div>
                        <div>
                            {/* <label>Title </label> */}
                            <input className="formTitle" type="text" name="title" placeholder="Title" value={formData.title} onChange={formHandleChange}></input>
                        </div>
                        {/* <input className="formTitle" type="file"></input> */}
                        <div>
                            {/* <label>Story</label> */}
                            <textarea className="formTextarea" name="story" placeholder="Write away" value={formData.story} onChange={formHandleChange}></textarea>
                        </div>
                        <div>
                            <button className="submit">Finalize editing</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    const handleDelete = (event) => {
        event.preventDefault()

        //make a fetch to delete blog
        fetch(`http://localhost:4000/blogs/${props.blog.id}`, {
            method: "DELETE"
        })
        //uses a callback function that takes the blog id
        props.deleteBlogState(props.blog.id)
    }

    console.log("before edit clicked title ", formData.title)
    let { blog } = props
    console.log("before edit clicked blog ", blog)

    return (
        <div>
            {formData.showEditForm
                ? handleEdit()
                : <div className="blogStory">
                    <div>
                        {blog.user.id === props.currentUser.userId
                            ? <button onClick={toggleEditForm}>Edit</button>
                            : null
                        }
                        {blog.user.id === props.currentUser.userId
                            ? <button onClick={handleDelete}>Delete</button>
                            : null
                        }
                    </div>
                    <h3>{blog.title}</h3>
                    {/* <h4>{blog.cover_image}</h4> */}
                    <h4>by {blog.user.name}</h4>
                    <p className="story">{blog.story}</p>
                    {/* <h5>likes {blog.likes}</h5> */}
                    <br />
                    <div>
                        <h4>Comments</h4>
                        <div>
                            <MakeComment blogId={blog.id} currentUser={props.currentUser} newCommentState={props.newCommentState} />
                        </div>
                        <div>
                            {renderComments()}
                        </div>
                    </div>
                    <br/>
                </div>
            }
        </div>
    )
}

export default BlogPageHook