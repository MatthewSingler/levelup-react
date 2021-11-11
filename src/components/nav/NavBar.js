import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-Link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-Link" to="/events">Events</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-Link" to="/games">Games</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-Link" to="/profile">Profile</Link>
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-Link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-Link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
