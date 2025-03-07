import React from "react";
import { Link } from "react-router-dom";
import NumberCounter from "../components/NumberCounter";
export const About = () => {
  return (
    <section id="content">
      <div className="content-wrap">
        <div className="container clearfix">
          <div className="col_full">
            <div className="heading-block center nobottomborder">
              <h2>Turning Ideas into Scalable Digital Solutions</h2>
              <span>
                Crafting Scalable Solutions with the Java Ecosystem & Modern
                JavaScript Frameworks
              </span>
            </div>
            <div className="row align-items-stretch clearfix">
              <div
                className="col-lg-4 d-none d-md-block"
                style={{
                  background:
                    "url('https://bilel-daikhi-portfolio.web.app/assets/img/bilel2.png') center center no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="col-lg-8">
                <div>
                  <div className="row align-items-stretch grid-border clearfix">
                    <div className="col-lg-4 col-md-6 col-padding">
                      <div className="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div className="fbox-icon">
                          <Link to="#">
                            <i className="fa-solid fa-globe i-plain i-xlarge divcenter nobottommargin"></i>
                          </Link>
                        </div>
                        <h3>Web Development</h3>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-padding">
                      <div className="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div className="fbox-icon">
                          <Link to="#">
                            <i className="fa-solid fa-desktop i-plain i-xlarge divcenter nobottommargin"></i>
                          </Link>
                        </div>
                        <h3>Desktop Development</h3>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-padding">
                      <div className="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div className="fbox-icon">
                          <Link to="#">
                            <i className="fa-solid fa-laptop-code i-plain i-xlarge divcenter nobottommargin"></i>
                          </Link>
                        </div>
                        <h3>Backend Development</h3>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-padding">
                      <div className="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div className="fbox-icon">
                          <Link to="#">
                            <i className="fa-solid fa-layer-group i-plain i-xlarge divcenter nobottommargin"></i>
                          </Link>
                        </div>
                        <h3>Custom Business Applications</h3>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-padding">
                      <div className="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div className="fbox-icon">
                          <Link to="#">
                            <i className="fa-solid fa-laptop-house i-plain i-xlarge divcenter nobottommargin"></i>
                          </Link>
                        </div>
                        <h3>Freelance Consulting & Project Support</h3>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-padding">
                      <div className="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div className="fbox-icon">
                          <Link to="#">
                            <i className="fa-solid fa-chalkboard-teacher i-plain i-xlarge divcenter nobottommargin"></i>
                          </Link>
                        </div>
                        <h3>Technical Training</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="line"></div>
          </div>
          <div className="col_one_fourth center" data-animate="bounceIn">
            <i className="fa-solid fa-users i-plain i-xlarge divcenter nobottommargin"></i>
            <div className="counter counter-large" style={{ color: "#3498db" }}>
              <NumberCounter
                from={0}
                to={20}
                speed={1000}
                plus="+"
                refreshInterval={200}
                formatNumber={true}
              />
            </div>
            <h5>Clients Served</h5>
          </div>

          <div
            className="col_one_fourth center"
            data-animate="bounceIn"
            data-delay="200"
          >
            <i className="fa-solid fa-code i-plain i-xlarge divcenter nobottommargin"></i>
            <div className="counter counter-large" style={{ color: "#e74c3c" }}>
              <NumberCounter
                from={0}
                to={10}
                speed={1000}
                plus="+"
                unit="M"
                refreshInterval={200}
                formatNumber={true}
              />
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
              <NumberCounter
                from={0}
                to={50}
                speed={1000}
                plus="+"
                refreshInterval={200}
                formatNumber={true}
              />
            </div>
            <h5>No. of Projects</h5>
          </div>

          <div
            className="col_one_fourth center col_last"
            data-animate="bounceIn"
            data-delay="600"
          >
            <i className="fa-solid fa-mug-hot i-plain i-xlarge divcenter nobottommargin"></i>

            <div className="counter counter-large" style={{ color: "#9b59b6" }}>
              <NumberCounter
                from={0}
                to={100}
                speed={1000}
                plus="+"
                unit="M"
                refreshInterval={200}
                formatNumber={true}
              />
            </div>
            <h5>Cups of Coffee</h5>
          </div>

          <div className="clear"></div>

          <div className="promo promo-light bottommargin">
            <h3>
              Send an Email today at <span>bilel.daikhi@gmail.com</span>
            </h3>
            <span>
              Web, Desktop &amp; Backend Development | Custom Business
              Applications | Strategic Consulting &amp; Technical Training to
              Scale Your Operations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
