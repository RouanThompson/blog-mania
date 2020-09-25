import React from 'react'
import { NavLink } from 'react-router-dom'

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'gray',
    textDecoration: 'none',
    color: 'white'
}

const NavBar = () => {
        return(
            <div>
                <NavLink
                    to="/"
                    exact
                    style={link}
                    activeStyle={{background: 'pink'}}
                >Home</NavLink>
                <NavLink
                    to="/myprofile"
                    exact
                    style={link}
                    activeStyle={{background: 'pink'}}
                >My Profile</NavLink>
                <NavLink
                    to="/makeblog"
                    exact
                    style={link}
                    activeStyle={{background: 'pink'}}
                >Make a Blog</NavLink>
                <NavLink
                    to="/login"
                    exact
                    style={link}
                    activeStyle={{background: 'pink'}}
                >Login</NavLink>
                <NavLink
                    to="/about"
                    exact
                    style={link}
                    activeStyle={{background: 'pink'}}
                >About</NavLink>
            </div>
        )
}

export default NavBar