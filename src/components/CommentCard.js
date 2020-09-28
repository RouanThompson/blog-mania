import React from 'react'

class CommentCard extends React.Component{

    render(){
        // console.log(this.props.comment)
        let comment = this.props.comment
        return(
            <div>
                {comment.name}:<br/>
                {comment.statement}<br/>
            </div>
        )
    }

}

export default CommentCard