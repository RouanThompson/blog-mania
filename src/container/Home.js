// import { render } from '@testing-library/react'
import React from "react";
// import { Container } from 'semantic-ui-react'
import BlogCard from "../components/BlogCard";

class Home extends React.Component {
  // render card home will have a function that maps each blog and pass to render <BlogCard />

  renderBlogs = () => {
      // Jackson says he uses this all the time
      // Netaly says it has to do with stack calls, Jackson pm a video on basic stack calls
    if (this.props.blogs) {
      return this.props.blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          currentUser={this.props.currentUser}
        />
      ));
    }
  };

  render() {
    console.log("In Home", this.props.blogs);
    //imported image
    let banner = "./Blog-Mania.png";
    return (
      <div>
        {/* imported image  */}
        <img src={banner} className="banner" alt=""></img>
        {/* <div className="subTitle">
                    <h1>Blogs</h1>
                </div> */}
        <div className="wrapper">
          <div className="grid">{this.renderBlogs()}</div>
        </div>
      </div>
    );
  }
}

export default Home;
