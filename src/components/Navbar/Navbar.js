import React, { Component } from 'react';
import App from "../App"
import { MenuItems } from "./MenuItems"

class Navbar extends Component  {
    render() {
        return (
            <nav className="NavbarItems">
                <h1
                    className="navbar-logo">React</h1>
                
                <div className="menu-icon"></div>

                <ul>
                    <li><a href=""></a></li>
                    {/* //The <a> tag defines a hyperlink, which is used to link from one page to another.  */}
                </ul>

            </nav>
        )
    }
}

export default Navbar