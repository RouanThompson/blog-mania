// import { render } from '@testing-library/react'
import React from 'react'
// import { Container } from 'semantic-ui-react'
import BlogCard from '../components/BlogCard'

class Home extends React.Component{
    // render card home will have a function that maps each blog and pass to render <BlogCard />
    
    renderBlogs = () => {
        return this.props.blogs.map(blog => <BlogCard key={blog.id} blog={blog} currentUser={this.props.currentUser} newCommentState={this.props.newCommentState} deleteCommentState={this.props.deleteCommentState}/>)
    }
    
    render(){
        // console.log("In Home", this.props)
        return(
            <div>
                <h1>Blogs</h1>
                {this.renderBlogs()}
            </div>
        )
    }
}

export default Home