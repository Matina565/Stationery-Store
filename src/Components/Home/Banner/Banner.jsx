import React from "react";
import "./Banner.css";

import { Link } from "react-router-dom";

const Banner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="banner">
        <div className="bannerLeft">
          <h6 className="bannerh6">Starting At Rs.50</h6>
          <h3 className="bannerh3">Summer</h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "white" }}>
              Shop Now
            </Link>
          </h5>
        </div>
        <div className="bannerRight">
          <h6 className="bannerh6" style={{ color: "white" }}>
            Starting At Rs.100
          </h6>
          <h3 className="bannerh3" style={{ color: "white" }}>
            Winter
          </h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={scrollToTop} style={{ color: "white" }}>
              Shop Now
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Banner;
