import React from 'react'

class CommentCard extends React.Component{

    state = {
        showEditForm: false,
        editComment: this.props.comment.statement,
        ids: {
            commentId: this.props.comment.id,
            userId: this.props.comment.user_id
        }
    }

    toggleEditForm = (event) => {
        if (event){
            event.preventDefault()
        }
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    formHandleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name]: value
        })
    }

    handlePatch = (event) => {
        event.preventDefault()
 
        let comment = {
            statement: this.state.editComment,
            likes: this.props.comment.likes,
            user_id: this.props.comment.user_id,
            blog_id: this.props.blogId,
            name: this.props.comment.name
        }

        // console.log(this.props.comment.id)

        let id = this.props.comment.id
        fetch(`http://localhost:4000/comments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(r => r.json())
            .then(blogs => {
                this.props.updateCommentState(blogs)
            })
            this.toggleEditForm()
    }

    handleEdit = () => {
        // event.preventDefault()
        console.log("Edit button clicked")
        return (
            <form onSubmit={this.handlePatch}>
                <div>
                    <input type="text" name="editComment" placeholder="Edit Comment" value={this.state.editComment} onChange={this.formHandleChange}></input>
                </div>
                <div>
                    <button>Submit Edit</button>
                </div>
            </form>
        )

    }

    handleDelete = (event) => {
        event.preventDefault()

        let ids = {
            commentId: this.props.commentId,
            blogId: this.props.blogId
        }

        console.log("Delete button Clicked")

        // console.log("Delete button clicked", this.props.comment.id)
        fetch(`http://localhost:4000/comments/${this.props.comment.id}`, {
            method: "DELETE"
        })
        this.props.deleteCommentState(ids)
    }


    render(){
        // console.log(this.props.comment)
        let comment = this.props.comment
        return(
            <div>
                <form>
                    <div>
                        {comment.name}: {comment.statement}
                    </div>
                    {comment.user_id === this.props.currentUser.userId
                        ? <button onClick={this.toggleEditForm}>Edit</button>
                        : null
                    }
                    {comment.user_id === this.props.currentUser.userId
                        ? <button onClick={this.handleDelete}>Delete</button>
                        : null
                    }
                </form>
                {this.state.showEditForm ? this.handleEdit() : null}
            </div>
        )
    }

}

export default CommentCard