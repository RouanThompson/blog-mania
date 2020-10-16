import React from "react"
import Home from "../container/Home"

class MyProfile extends React.Component {
  render() {
    console.log("In myprofile", this.props.currentUser.username)
    // console.log("In myprofile", this.props.blogs)

    let userBlogs = this.props.blogs.filter(
      (blog) => blog.user.username === this.props.currentUser.username
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
