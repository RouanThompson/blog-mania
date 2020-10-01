import React from 'react'

class CommentCard extends React.Component{

    handleEdit = (event) => {

        console.log("Edit button clicked")

    }

    handleDelete = (event) => {
        // event.preventDefault()

        let ids = {
            commentId: this.props.commentId,
            blogId: this.props.blogId
        }

        console.log("Delete button Clicked")
        // console.log(this.props.deleteCommentState)

        // console.log("Delete button clicked", this.props.comment.id)
        fetch(`http://localhost:4000/comments/${this.props.comment.id}`, {
            method: "DELETE"
        })
            // .then(r => r.json())
            // .then(deletedComment => {
            //     console.log(deletedComment)
            // })
        this.props.deleteCommentState(ids)
    }


    render(){
        // console.log(this.props.comment)
        let comment = this.props.comment
        return(
            <div>
                {comment.name}:<br/>
                {comment.statement}<br/>
                <button onClick={this.handleEdit}>Edit</button>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }

}

export default CommentCard