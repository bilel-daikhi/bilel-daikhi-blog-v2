 
import {createBrowserRouter} from "react-router-dom";
import Home from "../layouts";
import CurrentPost from "../layouts/CurrentPost";
import { Layout } from "../layouts/Layout";
import Contact from "../layouts/Contact"; 
import NewPost from "../layouts/NewPost";
import About from "../layouts/About";
import LOGIN from "../layouts/auth/Login";
import ErrorPage from "../layouts/Error";
import TagsList from "../components/tags/TagsList";
import Categories from "../layouts/categories";

export const ROOT_PATH = "/";
export const LOGIN_PATH = "/login";
export const CONTACT_PATH = "/contact";
export const ABOUT_PATH = "/about";
export const CATEGORIES_PATH = "/categories";
export const TAGS_PATH = "/tags";
export const ADD_POST_PATH = "/add-post";
export const FIND_POST_PATH = "/posts/:postId";

export const router = createBrowserRouter([{
  element:<Layout />,
  errorElement: <ErrorPage />,
  children:[
  {path: ROOT_PATH, element: <Home />},
  {path: LOGIN_PATH, element: <LOGIN />},
  {path: CONTACT_PATH, element: <Contact />},
  {path: CATEGORIES_PATH, element: <Categories />},
  {path: ABOUT_PATH, element: <About />},
  {path: FIND_POST_PATH, element: <CurrentPost />},
  {path: ADD_POST_PATH, element: <NewPost />},
  {path: TAGS_PATH, element: <TagsList />},
]}
  
]);
