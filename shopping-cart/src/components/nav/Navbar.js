import React from 'react';
import {NavLink} from 'react-router-dom'
import logo from '../../tools/logo.png';
function Navbar(props) {
    return (
        <nav className="box-shadow">
        <div className=" container d-flex navbar-expand-md row">
        <div className="col-4 col-md-2 ">
            <img src={logo} alt="Sabka Bazar" className="brand-logo" />
        </div>
        <div className="col-8 col-md-10 d-flex justify-content-between ">
            <div className="align-self-end mb-2">
                <ul className="nav-list collapse navbar-collapse">
                    <li className="nav-item ">
                        <NavLink  activeClassName="active" to="/" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink  activeClassName="active" to="/products">Products</NavLink>
                    </li> 
                </ul>
            </div>
            <div >
                <div  className="mb-2">
                    <ul className="nav-list justify-content-end collapse navbar-collapse">
                        <li className="nav-item">
                            <NavLink  activeClassName="active" to="/signin">Sign-in</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  activeClassName="active" to="/register">Register</NavLink>
                        </li>
                    </ul>
                </div>
                <div class="cart">
                    <div className="d-inline-block">
                    `   <img src={logo} alt="cart"  />
                    </div>
                    <span>0 items</span>
                </div>
            </div>
           
        </div>
        </div>
    </nav>
    );
}

export default Navbar;