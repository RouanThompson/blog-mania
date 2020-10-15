import React from 'react'
import { NavLink } from 'react-router-dom'

const link = {
    padding: '10px',
    background: '#faf0af',
    textDecoration: 'none',
    color: 'black',
    borderRadius: '25px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    margin: '0 5px',
    // border: '1px solid #000000'

}

const active = {
    background: '#8bcdcd',
    boxShadow: '0 15px 8px 0 rgba(0, 0, 0, 0.2)',

}

const NavBar = () => {
        return(
            <div>
                <NavLink
                    to="/"
                    exact
                    style={link}
                    activeStyle={active}
                >Home</NavLink>
                <NavLink
                    to="/makeblog"
                    exact
                    style={link}
                    activeStyle={active}
                >Make a Blog</NavLink>
                <NavLink
                    to="/myprofile"
                    exact
                    style={link}
                    activeStyle={active}
                >My Profile</NavLink>
                <NavLink
                    to="/login"
                    exact
                    style={link}
                    activeStyle={active}
                >Login</NavLink>
                <NavLink
                    to="/signup"
                    exact
                    style={link}
                    activeStyle={active}
                >Sign Up</NavLink>
                <NavLink
                    to="/about"
                    exact
                    style={link}
                    activeStyle={active}
                >About</NavLink>
            </div>
        )
}

export default NavBar