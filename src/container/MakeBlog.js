import React from 'react'

class MakeBlog extends React.Component {

    //state for the form
    state = {
        cover_image: "",
        title: "",
        story: "",
        likes: 0,
        // >>>>>>>>>>> Hard coded user id change later if auth is implemented <<<<<<<<<<<<<
        user_id: 1
    }

    //changes the state with the valkues from the form
    formHandleChange = (event) => {
    
        let name = event.target.name
        let value = event.target.value
        // console.log(name)
        // console.log(value)
        this.setState({
            [name]: value
        })
        
    }

    // The submission should handle the POST to persist data(newBlog) to the database
    // 0 - prevent reload, with event.preventDefault(), which is the default behavior of submit event
    // 1st make a blogObj with values of the state of the form with controlled inputs
    // 2nd make a Fetch POST request and convert the blogObj to string with JSON.stringify(blogObj)
    // 3rd then convert that response with r.json()
    // 4th then take that response, the newBlog, and call newBlogState() that will accept newBlog as arg
    // newBlogState is within App.js
    // State of blogs in App.js will then need to be updated to reflect the newBlog that was added to the database
    // Finally the DOM will need to be updated to reflect that of the state
    // Which is achieved with setState that will trigger a re-render
    // Go to App.js - newBlogState function definition - to see the rest of the process 
    formHandleSubmit = (event) => {
        alert('A form was submitted title: ' + this.state.title + ' and story: ' + this.state.story)
        // 0
        event.preventDefault()

        // 1st
        // cover_image, likes, user_id are hard coded must change after auth
        let blogObj = {
            cover_image: "post",
            title: this.state.title,
            story: this.state.story,
            likes: 0,
            user_id: this.state.user_id
        }

        //2nd
        fetch("http://localhost:4000/blogs", {
            // the request type
            method: "POST",
            headers: {
                //what data is expected to be
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogObj)
        })
            //3rd
            .then(r => r.json())
            //4th
            .then(newBlog => {
                this.props.newBlogState(newBlog)
            })
    }
    
    render(){

    //    console.log(this.state.title)
    //    console.log(this.state.story)
        let banner = "./think-2.png"
        return(
            <div>
                <img src={banner} className="banner2" alt=""></img><br/>
                <form onSubmit={this.formHandleSubmit}>
                    <div>
                        <div>
                            {/* <label>Title </label> */}
                            <input className="formTitle" type="text"  name="title" placeholder="Title" value={this.state.title} onChange={this.formHandleChange}></input>
                        </div>
                        {/* <input className="formTitle" type="file"></input> */}
                        <div>
                            {/* <label>Story</label> */}
                            <textarea className="formTextarea" name="story" placeholder="Write away" value={this.state.value} onChange={this.formHandleChange}></textarea>
                        </div>
                        <div>
                            <button className="submit">Publish</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default MakeBlog