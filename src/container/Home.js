// import { render } from '@testing-library/react'
import React from 'react'
// import { Container } from 'semantic-ui-react'
import BlogCard from '../components/BlogCard'

class Home extends React.Component{
    // render card home will have a function that maps each blog and pass to render <BlogCard />
    
    renderBlogs = () => {
        return this.props.blogs.map(blog => <BlogCard key={blog.id} blog={blog} currentUser={this.props.currentUser} />)
    }
    
    render(){
        // console.log("In Home", this.props)
        let banner = "./Blog-Mania.png"
        return(
            <div>
                <img src={banner} className="banner" alt=""></img>
                {/* <div className="subTitle">
                    <h1>Blogs</h1>
                </div> */}
                <div className="wrapper">
                    <div className="grid">
                        {this.renderBlogs()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home