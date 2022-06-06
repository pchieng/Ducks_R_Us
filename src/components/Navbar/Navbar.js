import React from "react";
import { MenuItems } from "./MenuItems";
import "./NavStyle.css";

const Navbar = (props) => {

const { isLoggedIn } = props;


    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          {/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/3TYvCMq/8850cbee960349b896d3845ddd45fc32.png" alt="8850cbee960349b896d3845ddd45fc32" border="0" /></a> */}
        Ducks'R'Us
        </h1>

        <div className="navbar-links">
          {isLoggedIn ? 
          <p>{`Welcome, ${localStorage.getItem("username")}`}</p>
          :
          null}
          {MenuItems.map((item, index) => {
            return (
              <>
              <div>
              </div>
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
              </>
            );
          })}
        </div>
      </nav>

    );
  
}

export default Navbar;
