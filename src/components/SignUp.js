import React, { useState, useEffect } from 'react'

const SignUp = (props) => {

    const [ userInfo, setUserInfo ] = useState({
        name: "",
        age: "",
        username: "",
        password: "",
        displayPhoto: ""
    })

    const handleFormChange = (event) => {
        event.preventDefault()

        const name = event.target.name
        const value = event.target.value

        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const userObj = {
            name: userInfo.name,
            age: userInfo.age,
            username: userInfo.username,
            password: userInfo.password,
            display_photo: userInfo.displayPhoto
        }

        fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
            .then(r => r.json())
            .then(newUser => console.log(newUser))
    }
    

    return(
        <div>
            <h1>Sign Up</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <input className="formTitle" name="name" type="text" placeholder="Name" value={userInfo.name} onChange={handleFormChange}/>
                </div>
                <div>
                    <input className="formTitle" name="age" type="text" placeholder="Age" pattern="[0-9]*" value={userInfo.age} onChange={handleFormChange}/>
                </div>
                <div>
                    <input className="formTitle" name="username" type="text" placeholder="Username" value={userInfo.username} onChange={handleFormChange}/>
                </div>
                <div>
                    <input className="formTitle" name="password" type="text" placeholder="Password" value={userInfo.password} onChange={handleFormChange}/>
                </div>
                <div>
                    <input className="submit" type="submit" value="Create Profile" />
                </div>
            </form>
        </div>
    )
}

export default SignUp