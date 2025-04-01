 
import {createBrowserRouter} from "react-router-dom";
import Home from "../layouts";
import SelectedPost from "../layouts/SelectedPost";
import { Layout } from "../layouts/Layout";
import Contact from "../layouts/Contact"; 
import NewPost from "../layouts/NewPost";
import About from "../layouts/About";
import LOGIN from "../layouts/auth/Login";
import ErrorPage from "../layouts/Error";
import TagsList from "../components/tags/TagsList";
import Categories from "../layouts/categories";
import Unauthorized from "../layouts/auth/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

export const ROOT_PATH = "/";
export const LOGIN_PATH = "/login";
export const CONTACT_PATH = "/contact";
export const ABOUT_PATH = "/about";
export const CATEGORIES_PATH = "/categories";
export const TAGS_PATH = "/tags";
export const ADD_POST_PATH = "/add-post";
export const FIND_POST_PATH = "/posts/:postId";
export const UNAUTHORIZED = "/unauthorized";

export const router = createBrowserRouter([{
  element:<Layout />,
  errorElement: <ErrorPage />,
  children:[
  {path: ROOT_PATH, element: <Home />},
  {path: LOGIN_PATH, element: <LOGIN />},
  {path: CONTACT_PATH, element: <Contact />},
 
  {path: ABOUT_PATH, element: <About />},
  {path: FIND_POST_PATH, element: <SelectedPost />},
 
 
  {path: UNAUTHORIZED, element: <Unauthorized />},
   // Protected Categories Page
   {
    element: <ProtectedRoute allowedRoles={["admin"]} />, // Only admins  can access
    children: [{ path: CATEGORIES_PATH, element: <Categories /> }],
  }, {
    element: <ProtectedRoute allowedRoles={["admin"]} />, // Only admins  can access
    children: [{ path: TAGS_PATH, element: <TagsList /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />, // Only admins can access
    children: [{ path: ADD_POST_PATH, element: <NewPost /> }],
  },
]}
  
]);
