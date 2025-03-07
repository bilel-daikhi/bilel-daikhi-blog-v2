 
import {Link} from "react-router-dom";

export default function Footer() {
  return (<>
      <footer id="footer" className="dark">

        <div className="container">

    
          <div className="footer-widgets-wrap clearfix">

          <div className="col_one_third">

<div className="widget clearfix">

  <img src="images/footer-widget-logo.png" alt="" className="footer-logo"/>
  <div className="logo mb-4">
  <Link to="https://sbsa-solutions.web.app/" target="_blank" className="ml-2">  <h3>
    SBSA<span>Solutions.</span>
  </h3></Link>
</div>     

    <p><strong>Simple</strong>, <strong>Creative</strong> &amp; <strong>Flexible.</strong> We Build Smart Solutions.</p>

    <div style={{background: "url('images/world-map.png') no-repeat center center", backgroundSize: '100%'}}>
  
    </div>

</div>

</div>


             <div className="col_one_third">

<div className="widget widget_links clearfix">

  <h4>Quick Links</h4>

  <ul>
  <li>
    <Link to="/about">About</Link>
  </li>
  
  <li>
    <Link to="/contact">Contact</Link>
  </li>
  </ul>

</div>

</div>

            <div className="col_one_third col_last">

             

             
              <div className="widget clearfix" style={{marginBottom: "-20px"}}>

                <div className="row">
    
                <Link to="tel:+216-22605020">
                  <span className="text-color h6"><strong>Phone:</strong> +216 22 605 020</span>
                </Link>
                <br/>
                <Link to="mailto:bilel.daikhi@gmail.com">
                <span className="text-color h6">  <strong>Email:</strong> bilel.daikhi@gmail.com</span>
                  </Link>
                 

                </div>

              </div>

            </div>

          </div>

        </div>

        <div id="copyrights">

          <div className="container clearfix">

            <div className="col_half">
              Copyrights &copy; 2024 All Rights Reserved by  <Link to="https://sbsa-solutions.web.app/" target="_blank"> 
   <strong>SBSA</strong> Solutions.
  </Link>
  <br/>
             </div>

          

          </div>

        </div>

      </footer> 

       
</>
  );
}
