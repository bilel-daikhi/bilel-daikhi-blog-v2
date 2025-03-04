
 

import {LOGIN_PATH, ROOT_PATH} from "../lib/routes";
import {NavLink, Link as routerLink} from "react-router-dom";
 
import {useLogout,useAuth} from "../hooks/auths";
import "./Navbar.css"; 
export default function Navbar() {
  // const {colorMode, toggleColorMode} = useColorMode();
  const {logout, isLoading} = useLogout();
  const {user, authLoading} = useAuth();
  // const {
  //   isOpen: isMenuOpen,
  //   onOpen: onMenuOpen,
  //   onClose: onMenuClose,
  // } = useDisclosure();
  // const {
  //   isOpen: isModalOpen,
  //   onOpen: onModalOpen,
  //   onClose: onModalClose,
  // } = useDisclosure();

  const Links = [
    {id: 1, path: ROOT_PATH, name: "Home"},
    {id: 2, path: LOGIN_PATH, name: "Sign in"},
     
  ];
  return (
    <>
 <nav className="navbar navbar-expand-lg navbar-light sticky-top">
 <NavLink className="navbar-brand" to="/">
     <h1 className="navbar-brand">Mrayti 7aboubi w rou7i ana</h1>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link px-lg-3 py-3 py-lg-4"
              to="/"
              activeClassName="active"
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link px-lg-3 py-3 py-lg-4"
              to="/contact"
              activeClassName="active"
            >
              Contact
            </NavLink>
          </li> 
          <li className="nav-item">
            <NavLink
              className="nav-link px-lg-3 py-3 py-lg-4"
              to="/categories"
              activeClassName="active"
            >
              Categories
            </NavLink>
          </li> 
          <li className="nav-item">
            <NavLink
              className="nav-link px-lg-3 py-3 py-lg-4"
              to="/about"
              activeClassName="active"
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link px-lg-3 py-3 py-lg-4"
              to="/tags"
              activeClassName="active"
            >
              Tags
            </NavLink>
          </li>
         
          {user ? (<>
            <li className="nav-item">
              <span className="nav-link px-lg-3 py-3 py-lg-4">{user.username}</span>
            </li>
             <li className="nav-item">
              <NavLink
                className="nav-link px-lg-3 py-3 py-lg-4"
                to="/logout"
                activeClassName="active"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> 
               </NavLink>
           </li></>
          ) : (
            <li className="nav-item">
              <NavLink
                className="nav-link px-lg-3 py-3 py-lg-4"
                to="/login"
                activeClassName="active"
              >
               <i className="fa-solid fa-right-to-bracket"></i>             
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav> 
    
 
     
     
     
      </>
);
}
