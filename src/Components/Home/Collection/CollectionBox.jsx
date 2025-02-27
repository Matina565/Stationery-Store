import React from "react";
import "./CollectionBox.css";

import { Link } from "react-router-dom";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <div className="collection">
        <div className="collectionLeft">
          <p className="col-p"></p>
          <h3 className="col-h3">
            <span>Art Supplies Collection</span>
          </h3>
          <div className="col-link">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Shop Now</h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div className="collectionTop">
            <p className="col-p"></p>
            <h3 className="col-h3">
              <span>Greeting Cards and Gift Collection</span> 
            </h3>
            <div className="col-link">
              <Link to="/shop" onClick={scrollToTop}>
                <h5>Shop Now</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div className="box1">
              <p className="col-p"></p>
              <h3 className="col-h3">
                <span>Office Essentials Collection</span>
              </h3>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
            <div className="box2">
              <h3 className="col-h3">
                <span>E-gift Cards</span> 
              </h3>
              <p className="col-p">
                Surprise someone with the gift they really want.
              </p>
              <div className="col-link">
                <Link to="/shop" onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CollectionBox;
