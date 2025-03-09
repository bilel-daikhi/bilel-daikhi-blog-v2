import React from "react";
import { useRouteError } from "react-router-dom";
import Footer from "../components/Footer"; 
import Navbar from "../components/Navbar";
 

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
     <Navbar />
     <section id="content">

<div class="content-wrap">

  <div class="container clearfix">

    <div class="col_half nobottommargin">
      <div class="error404 center">{error.status}</div>
    </div>

    <div class="col_half nobottommargin col_last">

      <div class="heading-block nobottomborder">
        <h4>{title}</h4>
        <span>{message}</span>
      </div>
  
    </div>

  </div>

</div>

</section> 
      <Footer />
    </>
  );
};

export default ErrorPage;
