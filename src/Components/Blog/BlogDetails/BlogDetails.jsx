import React from "react";

import "./BlogDetails.css";

import blogdetail1 from "../../../Assets/Blog/blogDetail1.jpg";
import blogimage1 from "../../../Assets/Blog/blogDetail2.jpg";
import blogimage2 from "../../../Assets/Blog/blogDetail3.jpg";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const BlogDetails = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="blogDetailsSection">
        <div className="blogDetailsSectionContainer">
          <div className="blogDetailsHeading">
            <h2>5 Tips to Increase Your Online Sales</h2>
            <div className="blogDetailsMetaData">
              <span>by Matina</span>
              <span>May 29, 2024</span>
              <span>Trends</span>
            </div>
          </div>
          <div className="blogDetailsFeaturedImg">
            <img src={blogdetail1} alt="" />
          </div>
          <div className="blogDetailsContent">
            <p>
              An online stationery store often features a well-organized catalog
              with categories for easy navigation, allowing customers to quickly
              find what they need. Many stores also offer seasonal collections,
              personalized stationery, and bulk purchase discounts for schools
              and businesses. To enhance customer experience, features like live
              chat support, order tracking, and customer reviews are commonly
              included. Additionally, promotional campaigns, loyalty programs,
              and special deals help attract and retain customers. With secure
              payment options and reliable delivery services, an online
              stationery store provides a seamless shopping experience for
              students, professionals, and creative enthusiasts alike.
            </p>
            <h5>5 tips to increase online sales</h5>
            <p>
              1. Improve Your Website’s User Experience (UX)
              <br />
              2. Offer Discounts & Bundle Deals
              <br />
              3. Leverage Social Media & Influencer Marketing
              <br />
              4. Implement Easy & Secure Payment Options
              <br />
              5. Use Email & Retargeting Ads
            </p>
            <div className="blogDetailsContentBullets">
              <div className="blogDetailsContentBulletscontent">
                <h5>Why choose product?</h5>
                <p>
                  <ul>
                    <li>Unique Features & Customization</li>
                    <li>Brand Trust & Popularity</li>
                    <li>Customer Reviews & Ratings</li>
                  </ul>
                </p>
              </div>
              <div className="blogDetailsContentBulletscontent"></div>
            </div>
            <p></p>
          </div>
          <div className="blogDetailsContentImg">
            <img src={blogimage1} alt="" />
            <img src={blogimage2} alt="" />
          </div>
          <div className="blogDetailsContent">
            <p>
              Increasing online sales for a stationery store requires a
              combination of smart strategies,user-friendly design, and
              effective marketing. By enhancing the website’s user experience,
              offering attractive discounts and bundle deals, leveraging social
              media for promotions, and providing secure and convenient payment
              options, you can attract more customers and boost conversions.
              Additionally, retargeting ads and email marketing help retain
              existing customers and encourage repeat purchases. With the right
              approach, your online stationery store can grow successfully,
              providing high-quality products and a seamless shopping experience
              to customers.
            </p>
            <p></p>
          </div>
          <div className="share-buttons">
            <button className="share-button facebook">
              <FaFacebookF /> Share on Facebook
            </button>
            <button className="share-button twitter">
              <FaXTwitter />
              Share on Twitter
            </button>
            <button className="share-button pinterest">
              <FaPinterest /> Share on Pinterest
            </button>
            <button className="share-button more">
              <FaPlus size={20} />
            </button>
          </div>
          <div className="blogDetailsNextPrev">
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon"
                onClick={scrollToTop}
              >
                <GoChevronLeft size={20} />
                <p>PREVIOUS POST</p>
              </div>
              <p>Given Set was without from god divide rule Hath</p>
            </div>
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon2"
                onClick={scrollToTop}
              >
                <p>NEXT POST</p>
                <GoChevronRight size={20} />
              </div>
              <p style={{ textAlign: "right" }}>
                Tree earth fowl given moveth deep lesser after
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
