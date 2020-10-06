import React from 'react'
import CommentCard from './CommentCard'
import MakeComment from './MakeComment'
// import { Link } from 'react-router-dom'


class BlogPage extends React.Component {
    //class

    renderComments = () => {
        // console.log("in render comments", this.props)
        let { comments } = this.props.blog
        comments.reverse()
        return comments.map(comment => <CommentCard key={comment.id} comment={comment} commentId={comment.id} blogId={this.props.blog.id} currentUser={this.props.currentUser} deleteCommentState={this.props.deleteCommentState} updateCommentState={this.props.updateCommentState}/>)
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
    render(){
        // console.log("In Blog Card", this.props.currentUser.userId)
        let {blog} = this.props
        return(
            <div className="blogStory">
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
                <br/>
                <div>
                    <h4>Comments</h4>
                    <div>
                        <MakeComment blogId={blog.id} currentUser={this.props.currentUser} newCommentState={this.props.newCommentState}/>
                    </div>
                    <div>
                        {this.renderComments()}
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default BlogPage