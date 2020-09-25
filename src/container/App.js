import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import About from '../components/About'
import Login from '../components/Login'
import MakeBlog from './MakeBlog'
import NavBar from './NavBar'
import MyProfile from '../components/MyProfile'
import { Container } from 'semantic-ui-react'


// const App = () => {
class App extends React.Component {

  //initial state of blogs and the current user logged in
  state = {
    blogs: [],
    // comments: [],
    currentUser: {
      user_id: 1,
      name: "Ron",
    }
  }

  // let [blogs, setBlogs] = useState([])
  // let [searchTerm, setSearchTerm] = useState([])

  // useEffect(() => {
  //   fetch("http://localhost:4000/blogs")
  //     .then(r => r.json())
  //     .then((arrayOfBlogs) => {
  //       setBlogs(arrayOfBlogs)
  //     })
  // }, [])


  // Get fetch data from database and saves it to state
  // do not call a seperate componentDidMount() it will not keep the state of blogs
  // on load do all fetches
  componentDidMount() {
    fetch("http://localhost:4000/blogs")
    .then(r => r.json())
    .then(arrayOfBlogs => this.setState({
      blogs: arrayOfBlogs
    }))

    // fetch("http://localhost:4000/comments")
    // .then(r => r.json())
    // .then(arrayOfComments => this.setState({
    //   comments: arrayOfComments
    // }))
  }

  // newBlogState adds the newBlog to state, and re-renders the DOM. Both done with setState
  // 1st use the spread operator to fill a new array with elements from blogs and add newBlog
  // 2nd use setState to change update the state and triggers a re-render
  //
  // pass down this function as props to MakeBlog which uses form.
  // This will update the state, in turn the DOM when renders triggers, still need to persist new Blog to database using Rails API
  newBlogState = (newBlog) => {

    // 1st
    let updatedBlogs = [newBlog,...this.state.blogs]

    // 2nd
    this.setState({
      blogs: updatedBlogs
    })
  }

  render(){
    
    // console.log("In App", this.state.blogs)
    return (
      <Router>
        <Container>
          <NavBar />
          <br/>
          <br/>
          <br/>
          <br/>
          <Route exact path="/" render={() => ( <Home blogs={this.state.blogs} />)}/>
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/makeblog" render={() => <MakeBlog newBlogState={this.newBlogState} />}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
        </Container>
      </Router>
    )
  }
}

export default App

// import './App.css';