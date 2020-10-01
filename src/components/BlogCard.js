import React from 'react'
import { Link } from 'react-router-dom'


class BlogCard extends React.Component {
    render(){
        let blog = this.props.blog
        return(
            <div>
                <Link to={`/blogs/${blog.id}`}>
                    <h3>{blog.title}</h3>
                    <h4>{blog.cover_image}</h4>
                    <h4>by {blog.user.name}</h4>
                    <h3>Description</h3>
                    <h5>likes {blog.likes}</h5>
                </Link>
            </div>
        )
    }
}

export default BlogCard