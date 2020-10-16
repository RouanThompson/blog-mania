import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Home from './Home'
import About from '../components/About'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import MakeBlog from './MakeBlog'
import NavBar from './NavBar'
import MyProfile from '../components/MyProfile'
import NotFound from '../components/NotFound'
// import BlogPage from '../components/BlogPage'

import BlogPageHook from '../components/BlogPageHook'

import { Container } from 'semantic-ui-react'


const AppHook = () => {

  // initial state of blogs and the current user logged in
  // blogs is will be use to hold the initial GET fetch and passed to Home > BlogCard to be rendered


  const [blogsData, setBlogsData] = useState([])

  const [currentUser, setCurrentUser] = useState ({})

  // Get fetch data from database and saves it to state

  useEffect(() => {
    fetch("http://localhost:4000/blogs")
    .then(r => r.json())
    .then(arrayOfBlogs => {
      setBlogsData(arrayOfBlogs.reverse())
    })
  }, [])

  // newBlogState adds the newBlog to state, and re-renders the DOM. Both done with setState
  // 1st use the spread operator to fill a new array with elements from blogs and add newBlog
  // 2nd use setState to change update the state and triggers a re-render
  //
  // pass down this function as props to MakeBlog which uses form.
  // This will update the state, in turn the DOM when renders triggers, still need to persist new Blog to database using Rails API
  const newBlogState = (newBlog) => {

    // 1st
    let updatedBlogs = [newBlog,...blogsData]

    // 2nd
    setBlogsData(updatedBlogs)
  }
  
  const deleteBlogState = (id) => {
    let copyOfBlogs = blogsData

    // console.log("blog id to be found", id)

    let filteredBlogs = copyOfBlogs.filter(blog => {
      // console.log(blog.id)
      return blog.id !== id
    })
    // console.log(filteredBlogs)

    setBlogsData(filteredBlogs)
  }

  const updateBlogState = (arrayOfBlogs) => {
    setBlogsData(arrayOfBlogs.reverse())
  }

  const newCommentState = (arrayOfBlogs) => {
    setBlogsData(arrayOfBlogs.reverse())
  }


  const deleteCommentState = (ids) => {
    // console.log("comment to be found ", ids.commentId)
    let copyOfBlogs = [...blogsData]
    let foundBlog = copyOfBlogs.find(blog => blog.id === ids.blogId)
    let filteredBlogComments = foundBlog.comments.filter(comment => {
      // console.log(comment.id)
      return comment.id !== ids.commentId
    })
    // console.log("after clear", foundBlog.comments)
    foundBlog.comments.length = 0

    foundBlog.comments = filteredBlogComments.reverse()

    copyOfBlogs.find(blog => {
      if (blog.id === ids.blogId)
        blog = foundBlog
    })
    setBlogsData(copyOfBlogs)

    // return console.log("after assign", copyOfBlogs)
  }

  const updateCommentState = (newBlogs) => {
    //need a better solution
    setBlogsData(newBlogs.reverse())
  }

  const blogToRender = (routerProps) => {
    //gets the id the user typed in address bar and convert it to interger
    let blogId = parseInt(routerProps.match.params.id)

    //searches blogs state for a blog that matches the blog id the user type and return that blog
    let foundBlog = blogsData.find(blogObj => blogObj.id === blogId)

    //if the foundBlog exits render the BlogCard else render NotFound
    return (
      foundBlog ? <BlogPageHook key={foundBlog.id} blog={foundBlog} currentUser={currentUser} newCommentState={newCommentState}  deleteBlogState={deleteBlogState} updateBlogState={updateBlogState} deleteCommentState={deleteCommentState} updateCommentState={updateCommentState}/> : <NotFound />
    )
  }

  const handleLogin = (userToLogin) => {
    console.log("in App: userToLogin Before setState", userToLogin)
    // asynchronous
    setCurrentUser(userToLogin)
  }
  console.log("in App: currentUser After SetState", currentUser)
  
  
  if (blogsData.length === 0)
  return <h1>Loading...</h1>
  // console.log("in App: ", blogsData)
  return (
    <main>
        <Container>
          <div>
            <NavBar />
          </div>
          <br/>
          <br/>
          <br/>
          {/* <div className="title"><h1>Welcome back To Blog-Mania,  {currentUser.name}</h1></div> */}
          <br/>
          <br/>
          <Route path="/blogs/:id" render={routerProps => blogToRender(routerProps)} />

          <Route exact path="/" render={() => ( <Home blogs={blogsData} currentUser={currentUser} />)}/>
          <Route exact path="/myprofile" render={() => <MyProfile blogs={blogsData} currentUser={currentUser}/>} />
          <Route exact path="/makeblog" render={() => <MakeBlog newBlogState={newBlogState} />}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" render={() => <SignUp handleLogin={handleLogin}/>} />
          <Route exact path="/about" component={About} />
        </Container>
    </main>
  )
}

export default AppHook