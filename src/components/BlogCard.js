import React from 'react'
import { Modal } from 'semantic-ui-react'
import CommentCard from './CommentCard'
import MakeComment from './MakeComment'

class BlogCard extends React.Component {
    //class

    renderComments = () => {
        console.log(this.props.blog.comments)
        return this.props.blog.comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)
    }

    render(){
        console.log("In Blog Card", this.props.currentUser.userId)
        let {blog} = this.props
        return(
            <div>
                <h3>{blog.title}</h3>
                <h4>{blog.cover_image}</h4>
                <h4>by {blog.user.name}</h4>
                <h3>change story to description here and have story show on click {blog.story}</h3>
                <h5>likes {blog.likes}</h5>
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

export default BlogCard