import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = ({ isLoggedIn }) => {

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid d-flex justify-content-between ">
                <div>
                    <Link class="navbar-brand" to='/'>CRUD</Link>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">

                        {isLoggedIn ? (
                            <>
                                <li class="nav-item px-2">
                                    <NavLink className="nav-link" to={'/'} >All Users</NavLink>
                                </li>
                                <li class="nav-item px-2">
                                    <NavLink className="nav-link" to={'/account'} >Account</NavLink>
                                </li>
                                <li class="nav-item px-2">
                                    <Link className="nav-link" onClick={logOut}  >Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li class="nav-item px-2">
                                    <NavLink className="nav-link" to={'/login'} >Login</NavLink>
                                </li>
                                <li class="nav-item px-2">
                                    <NavLink className="nav-link" to={'/register'} >Register</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar