import React from "react";
import { Link } from "react-router-dom";
export const About = () => {
  return (
    <section id="content">
      <div className="content-wrap">
        <div className="container clearfix">
          <div className="col_full">
            <div className="heading-block center nobottomborder">
              <h2>Interactive Office Environment</h2>
              <span>
                We value Work Ethics &amp; Environment as it helps in creating a
                Creative Thinktank
              </span>
            </div>
            <div class="row align-items-stretch clearfix">
              <div
                class="col-lg-4 d-none d-md-block"
                style={{
                  background:
                    "url('https://bilel-daikhi-portfolio.web.app/assets/img/bilel2.png') center center no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div class="col-lg-8">
                <div>
                  <div class="row align-items-stretch grid-border clearfix">
                    <div class="col-lg-4 col-md-6 col-padding">
                      <div class="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div class="fbox-icon">
                          <a href="#">
                            <i className="fa-solid fa-crop-simple i-plain i-xlarge divcenter nobottommargin"></i>
                          </a>
                        </div>
                        <h3>Responsive Framework</h3>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-padding">
                      <div class="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div class="fbox-icon">
                          <a href="#">
                            <i className="fa-solid fa-crop-simple i-plain i-xlarge divcenter nobottommargin"></i>
                          </a>
                        </div>
                        <h3>Beautifully Presented</h3>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-padding">
                      <div class="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div class="fbox-icon">
                          <a href="#">
                            <i className="fa-solid fa-globe i-plain i-xlarge divcenter nobottommargin"></i>
                          </a>
                        </div>
                        <h3>Extensively Extendable</h3>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-padding">
                      <div class="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div class="fbox-icon">
                          <a href="#">
                            <i className="fa-solid fa-globe i-plain i-xlarge divcenter nobottommargin"></i>
                          </a>
                        </div>
                        <h3>Powerfully Customizable</h3>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-padding">
                      <div class="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div class="fbox-icon">
                          <a href="#">
                            <i className="fa-solid fa-globe i-plain i-xlarge divcenter nobottommargin"></i>
                          </a>
                        </div>
                        <h3>Geniusly Transformable</h3>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-padding">
                      <div class="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div class="fbox-icon">
                          <a href="#">
                            <i className="fa-solid fa-globe i-plain i-xlarge divcenter nobottommargin"></i>
                          </a>
                        </div>
                        <h3>Industrial Support</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="line"></div>
          </div>
          <div className="col_one_fourth center" data-animate="bounceIn">
            <i className="fa-solid fa-diagram-project i-plain i-xlarge divcenter nobottommargin"></i>
            <div className="counter counter-large" style={{ color: "#3498db" }}>
              <span
                data-from="100"
                data-to="8465"
                data-refresh-interval="50"
                data-speed="2000"
              ></span>
            </div>
            <h5>Clients Served</h5>
          </div>

          <div
            className="col_one_fourth center"
            data-animate="bounceIn"
            data-delay="200"
          >
            <i className="fa-solid fa-laptop-code i-plain i-xlarge divcenter nobottommargin"></i>
            <div className="counter counter-large" style={{ color: "#e74c3c" }}>
              <span
                data-from="100"
                data-to="56841"
                data-refresh-interval="50"
                data-speed="2500"
              ></span>
            </div>
            <h5>Lines of Code</h5>
          </div>

          <div
            className="col_one_fourth center"
            data-animate="bounceIn"
            data-delay="400"
          >
            <i className="fa-solid fa-laptop-code i-plain i-xlarge divcenter nobottommargin"></i>
            <div className="counter counter-large" style={{ color: "#16a085" }}>
              <span
                data-from="100"
                data-to="2154"
                data-refresh-interval="50"
                data-speed="3500"
              ></span>
            </div>
            <h5>No. of Projects</h5>
          </div>

          <div
            className="col_one_fourth center col_last"
            data-animate="bounceIn"
            data-delay="600"
          >
            <i class="fa-solid fa-mug-hot i-plain i-xlarge divcenter nobottommargin"></i>

            <div className="counter counter-large" style={{ color: "#9b59b6" }}>
              <span
                data-from="100"
                data-to="874"
                data-refresh-interval="30"
                data-speed="2700"
              ></span>
            </div>
            <h5>Cups of Coffee</h5>
          </div>

          <div className="clear"></div>

          <div className="promo promo-light bottommargin">
            <h3>
              Send an Email today at <span>bilel.daikhi@gmail.com</span>
            </h3>
            <span>
              We strive to provide Our Customers with Top Notch Support to make
              their Theme Experience Wonderful
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
