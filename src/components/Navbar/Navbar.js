import React, { Component } from "react";
import App from "../App";
import { MenuItems } from "./MenuItems";
import "./NavStyle.css";

class Navbar extends Component {
    state = { clicked: false }

    render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          React<i className="fab fa-react"></i>
        </h1>

        <div className="menu-icon" onClick={this.handleClick}>
                {/* below is an icon. It will be one of two classes.  */}
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className="item.cName" href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
          {/* //The <a> tag defines a hyperlink, which is used to link from one page to another.  */}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
