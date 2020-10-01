import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import About from '../components/About'
import Login from '../components/Login'
import MakeBlog from './MakeBlog'
import NavBar from './NavBar'
import MyProfile from '../components/MyProfile'
import NotFound from '../components/NotFound'
import BlogPage from '../components/BlogPage'
import { Container } from 'semantic-ui-react'


// const App = () => {
class App extends React.Component {

  // initial state of blogs and the current user logged in
  // blogs is will be use to hold the initial GET fetch and passed to Home > BlogCard to be rendered
  state = {
    blogs: [],
    // comments: [],
    currentUser: {
      userId: 1,
      name: "Ron",
    }
  }

  // Get fetch data from database and saves it to state
  // do not call a seperate componentDidMount() it will not keep the state of blogs
  componentDidMount() {
    fetch("http://localhost:4000/blogs")
    .then(r => r.json())
    .then(arrayOfBlogs => this.setState({
      blogs: arrayOfBlogs.reverse()
    }))
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

  newCommentState = (arrayOfBlogs) => {
    this.setState({
      blogs: arrayOfBlogs.reverse()
    })
  }

  //find the blog id and then find the comment id and delete it
  editCommentState = () => {

  }

  deleteCommentState = (ids) => {
    console.log("comment to be found ", ids.commentId)
    let copyOfBlogs = this.state.blogs
    let foundBlog = copyOfBlogs.find(blog => blog.id === ids.blogId)
    let filteredBlogComments = foundBlog.comments.filter(comment => {
      console.log(comment.id)
      return comment.id !== ids.commentId
    })
    // console.log("after clear", foundBlog.comments)
    foundBlog.comments.length = 0

    foundBlog.comments = filteredBlogComments.reverse()

    copyOfBlogs.find(blog => {
      if (blog.id === ids.blogId)
        blog = foundBlog
    })
    this.setState({
      blogs: copyOfBlogs
    })

    // return console.log("after assign", copyOfBlogs)
  }

  updateCommentState = (newBlogs) => {
    //need a better solution
    this.setState({
      blogs: newBlogs
    })
    // console.log("comment to be found ", ids.commentId)
    // let copyOfBlogs = this.state.blogs
    // let foundBlog = copyOfBlogs.find(blog => blog.id === ids.blogId)
    // let filteredBlogComments = foundBlog.comments.filter(comment => {
    //   console.log(comment.id)
    //   return comment.id !== ids.commentId
    // })
    // // console.log("after clear", foundBlog.comments)
    // foundBlog.comments.length = 0

    // foundBlog.comments = filteredBlogComments.reverse()

    // copyOfBlogs.find(blog => {
    //   if (blog.id === ids.blogId)
    //     blog = foundBlog
    // })
    // this.setState({
    //   blogs: copyOfBlogs
    // })

    // return console.log("after assign", copyOfBlogs)
  }

  blogToRender = (routerProps) => {
    //gets the id the user typed in address bar and convert it to interger
    let blogId = parseInt(routerProps.match.params.id)

    //searches blogs state for a blog that matches the blog id the user type and return that blog
    let foundBlog = this.state.blogs.find(blogObj => blogObj.id === blogId)

    //if the foundBlog exits render the BlogCard else render NotFound
    return (
      foundBlog ? <BlogPage key={foundBlog.id} blog={foundBlog} currentUser={this.state.currentUser} newCommentState={this.newCommentState} editCommentState={this.editCommentState} deleteCommentState={this.deleteCommentState} updateCommentState={this.updateCommentState}/> : <NotFound />
    )
  }

  render(){
    
    if (this.state.blogs.length === 0)
      return <h1>Loading...</h1>
    return (
      <main>
          <Container>
            <NavBar />
            <h1>Welcome Back {this.state.currentUser.name}</h1>
            <br/>
            <br/>
            <br/>
            <Route path="/blogs/:id" render={routerProps => this.blogToRender(routerProps)} />

            <Route exact path="/" render={() => ( <Home blogs={this.state.blogs} currentUser={this.state.currentUser} />)}/>
            <Route exact path="/myprofile" render={() => <MyProfile blogs={this.state.blogs} currentUser={this.state.currentUser}/>} />
            <Route exact path="/makeblog" render={() => <MakeBlog newBlogState={this.newBlogState} />}/>
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/about" component={About} />
          </Container>
      </main>
    )
  }
}

export default App