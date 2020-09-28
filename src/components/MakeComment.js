import React from 'react'

class MakeComment extends React.Component{

    // state of comment form
    state = {
        statement: "",
        likes: 0,
        userId: this.props.currentUser.userId,
        blogId: this.props.blogId,
        name: this.props.currentUser.name
    }

    //going to need state, formHandle change, SUbmit(Post)

    formHandleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name]: value
        })
    }

    formHandleSubmit = (event) => {
        event.preventDefault()

        let commentObj = {
            statement: this.state.statement,
            likes: 0,
            user_id: this.state.userId,
            blog_id: this.state.blogId,
            name: this.state.name
        }

        fetch("http://localhost:4000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
            .then(r => r.json())
            .then(newComment => {
                this.props.newCommentState(newComment)
            })
    }


    render(){
        console.log("in Make comments", this.props.currentUser.name)
        return(
            <div>                
                <form onSubmit={this.formHandleSubmit}>
                    <div>
                        <input type="text" name="statement" placeholder="Add a comment" value={this.state.statement} onChange={this.formHandleChange}></input>
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MakeComment