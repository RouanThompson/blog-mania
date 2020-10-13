import React from "react"
import Home from "../container/Home"

class MyProfile extends React.Component {
  render() {
    let userBlogs = this.props.blogs.filter(
      (blog) => blog.user.id === this.props.currentUser.userId
    )
    return (
      <div>
        <h1>MyProfile</h1>
        <Home blogs={userBlogs} currentUser={this.props.currentUser} />
      </div>
    )
  }
}

export default MyProfile;
