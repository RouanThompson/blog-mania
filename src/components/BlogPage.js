import React from 'react'
import CommentCard from './CommentCard'
import MakeComment from './MakeComment'
import { Link } from 'react-router-dom'


class BlogPage extends React.Component {
    //class

    renderComments = () => {
        // console.log("in render comments", this.props)
        let { comments } = this.props.blog
        comments.reverse()
        return comments.map(comment => <CommentCard key={comment.id} comment={comment} commentId={comment.id} blogId={this.props.blog.id} currentUser={this.props.currentUser} deleteCommentState={this.props.deleteCommentState}/>)
    }

    //how to render a blogcard on click? call BlogCard again?
    // use link component from react router
    render(){
        // console.log("In Blog Card", this.props.currentUser.userId)
        let {blog} = this.props
        return(
            <div>
                <Link to={`/blogs/${blog.id}`}>
                    <h3>{blog.title}</h3>
                    <h4>{blog.cover_image}</h4>
                    <h4>by {blog.user.name}</h4>
                    <h3>change story to description here and have blog show on click {blog.story}</h3>
                    <h5>likes {blog.likes}</h5>
                </Link>
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