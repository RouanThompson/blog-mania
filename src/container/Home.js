// import { render } from '@testing-library/react'
import React from 'react'
// import { Container } from 'semantic-ui-react'
import BlogCard from '../components/BlogCard'

class Home extends React.Component{
    // render card home will have a render function that maps each blog and pass to render <BlogCard />
    
    renderBlogs = () => {
        return this.props.blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
    }
    
    render(){
        console.log("In Home", this.props.blogs)
        return(
            <div>
                <h1>Blogs</h1>
                {this.renderBlogs()}
            </div>
        )
    }
}

export default Home