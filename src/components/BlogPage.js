import React from 'react'
import CommentCard from './CommentCard'
import MakeComment from './MakeComment'
// import { Link } from 'react-router-dom'


class BlogPage extends React.Component {

    state = {
        showEditForm: false,
        id: this.props.blog.id,
        cover_image: this.props.blog.cover_image,
        title: this.props.blog.title,
        story: this.props.blog.story,
        likes: this.props.blog.likes,
        comments: this.props.blog.comments
    }

    renderComments = () => {
        console.log("blog ID", this.state.id)
        let { comments } = this.props.blog
        comments.reverse()
        return comments.map(comment => <CommentCard key={comment.id} comment={comment} commentId={comment.id} blogId={this.props.blog.id} currentUser={this.props.currentUser} deleteCommentState={this.props.deleteCommentState} updateCommentState={this.props.updateCommentState} />)
    }

    //controlled inputs
    formHandleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name]: value
        })
    }

    toggleEditForm = (event) => {
        console.log("Edit button clicked")
        //render the edit form with previous values

        //prevents reload on click
        if (event) {
            event.preventDefault()
        }
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    formHandlePatch = (event) => {
        event.preventDefault()

        let blog = {
            id: this.state.id,
            cover_image: this.state.cover_image,
            title: this.state.title,
            story: this.state.story,
            likes: this.state.likes,
            comments: this.state.comments
        }

        let id = this.props.blog.id
        fetch(`http://localhost:4000/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        })
            .then(r => r.json())
            .then(blogs => {
                this.props.updateBlogState(blogs)
            })
        this.toggleEditForm()
    }

    handleEdit = () => {

        // let banner = "./think-2.png"
        return (
            // <img src={banner} className="banner2" alt=""></img><br/>
            <div>
                <form onSubmit={this.formHandlePatch}>
                    <div>
                        <div>
                            {/* <label>Title </label> */}
                            <input className="formTitle" type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.formHandleChange}></input>
                        </div>
                        {/* <input className="formTitle" type="file"></input> */}
                        <div>
                            {/* <label>Story</label> */}
                            <textarea className="formTextarea" name="story" placeholder="Write away" value={this.state.story} onChange={this.formHandleChange}></textarea>
                        </div>
                        <div>
                            <button className="submit">Finalize editing</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    handleDelete = (event) => {
        event.preventDefault()

        //make a fetch to delete blog
        fetch(`http://localhost:4000/blogs/${this.props.blog.id}`, {
            method: "DELETE"
        })
        //uses a callback function that takes the blog id
        this.props.deleteBlogState(this.props.blog.id)
    }


    // use link component from react router
    render() {
        // console.log("In Blog Card", this.props.currentUser.userId)
        let { blog } = this.props
        return (
            <div>
                {this.state.showEditForm
                    ? this.handleEdit()
                    : <div className="blogStory">
                        <div>
                            {blog.user.id === this.props.currentUser.userId
                                ? <button onClick={this.toggleEditForm}>Edit</button>
                                : null
                            }
                            {blog.user.id === this.props.currentUser.userId
                                ? <button onClick={this.handleDelete}>Delete</button>
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
                                <MakeComment blogId={blog.id} currentUser={this.props.currentUser} newCommentState={this.props.newCommentState} />
                            </div>
                            <div>
                                {this.renderComments()}
                            </div>
                        </div>
                        <br/>
                    </div>
                }
            </div>
        )
    }
}

export default BlogPage