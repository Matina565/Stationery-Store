import React, { useState } from "react";
import "./AdditionalInfo.css";

import user1 from "../../../Assets/Users/user1.jpeg";
import user2 from "../../../Assets/Users/user2.jpeg";

import { FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";

const AdditionalInfo = () => {
  const [activeTab, setActiveTab] = useState("aiTab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="productAdditionalInfo">
        <div className="productAdditonalInfoContainer">
          <div className="productAdditionalInfoTabs">
            <div className="aiTabs">
              <p
                onClick={() => handleTabClick("aiTab1")}
                className={activeTab === "aiTab1" ? "aiActive" : ""}
              >
                Description
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Additional Information
              </p>
              <p
                onClick={() => handleTabClick("aiTab3")}
                className={activeTab === "aiTab3" ? "aiActive" : ""}
              >
                Reviews (2)
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 */}

            {activeTab === "aiTab1" && (
              <div className="aiTabDescription">
                <div className="descriptionPara">
                  <h3>Description about Stationery Store</h3>
                  <p>
                    A stationery store is a haven for all things related to
                    writing, organization, and creativity. It offers a wide
                    range of products, including notebooks, pens, pencils,
                    planners, sticky notes, and other office or school supplies.
                    Whether you're looking for elegant journals, functional
                    office essentials, or decorative crafting materials, a
                    stationery store provides both aesthetic and practical items
                    to suit every need. From students and professionals to
                    artists and hobbyists, these stores cater to anyone seeking
                    high-quality, stylish, and useful tools to enhance
                    productivity and inspire creativity.
                  </p>
                </div>
                <div className="descriptionParaGrid">
                  <div className="descriptionPara">
                    <h3>Why choose product?</h3>
                    <p>
                      <ul>
                        <li>
                          Quality stationery helps organize tasks and improve
                          workflow.
                        </li>
                        <li>
                          Offers tools for brainstorming, sketching, and
                          note-taking.
                        </li>
                        <li>
                          High-quality stationery lasts longer and withstands
                          daily use.
                        </li>
                      </ul>
                    </p>
                  </div>
                  {/* <div className="descriptionPara">
                    <h3>Sample Number List</h3>
                    <p>
                      <ol>
                        <li>Creat by cotton fibric with soft and smooth</li>
                        <li>
                          Simple, Configurable (e.g. size, color, etc.), bundled
                        </li>
                        <li>Downloadable/Digital Products, Virtual Products</li>
                      </ol>
                    </p>
                  </div> */}
                </div>
                <div className="descriptionPara">
                  {/* <h3>Lining</h3>
                  <p style={{ marginTop: "-10px" }}>
                    100% Polyester, Main: 100% Polyester.
                  </p> */}
                </div>
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "aiTab2" && (
              <div className="aiTabAdditionalInfo">
                <div className="additionalInfoContainer">
                  <h6>Weight</h6>
                  <p>250 gram</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Dimensions</h6>
                  <p> 90 x 60 x 90 cm</p>
                </div>
                {/* <div className="additionalInfoContainer">
                  <h6>Size</h6>
                  <p> XS, S, M, L, XL</p>
                </div> */}
                <div className="additionalInfoContainer">
                  <h6>Color</h6>
                  <p> Black, Orange, White</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6></h6>
                  <p> </p>
                </div>
              </div>
            )}

            {/* Tab3 */}

            {activeTab === "aiTab3" && (
              <div className="aiTabReview">
                <div className="aiTabReviewContainer">
                  <h3>Reviews</h3>
                  <div className="userReviews">
                    <div
                      className="userReview"
                      style={{ borderBottom: "1px solid #e4e4e4" }}
                    >
                      <div className="userReviewImg">
                        <img src={user1} alt="" />
                      </div>
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Janice Miller</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>April 06, 2023</p>
                          </div>
                        </div>
                        <div
                          className="userReviewBottomContent"
                          style={{ marginBottom: "30px" }}
                        >
                          <p>
                            "I recently ordered a set of handmade recycled paper
                            notebooks from this store, and I couldn't be happier
                            with my purchase! The quality is top-notch, and you
                            can really feel the love and care put into creating
                            each notebook. The texture of the recycled paper is
                            unique, and it's the perfect surface for my sketches
                            and journaling. The packaging was lovely and
                            eco-friendly, which made me feel even better about
                            my purchase. Shipping was also faster than expected!
                            Overall, I’m really impressed with the wide
                            selection of creative and sustainable products
                            available. I’ll definitely be back for more! Highly
                            recommend this store to anyone looking for
                            high-quality, environmentally conscious stationery."
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="userReview">
                      <div className="userReviewImg">
                        <img src={user2} alt="" />
                      </div>
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Benjam Porter</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>April 12, 2023</p>
                          </div>
                        </div>
                        <div className="userReviewBottomContent">
                          <p>
                            I recently stumbled upon this online stationery
                            store, and I have to say, I’m thoroughly impressed!
                            From the variety of products to the attention to
                            detail in packaging, it’s clear that they care about
                            their customers. The handmade recycled paper
                            notebooks I ordered are absolutely stunning! The
                            quality is top-notch, and I love that they’re
                            eco-friendly. The website is easy to navigate, and
                            my order arrived faster than I expected. I also
                            appreciate how the items are presented—each product
                            has a unique story behind it, making it feel like a
                            personal purchase. Will definitely be coming back to
                            buy more. Highly recommend to anyone who loves
                            beautiful, high-quality stationery!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="userNewReview">
                    <div className="userNewReviewMessage">
                      <h5>
                        Be the first to review “Handmade Recycled Paper
                        Notebooks”
                      </h5>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                    </div>
                    <div className="userNewReviewRating">
                      <label>Your rating *</label>
                      <Rating name="simple-controlled" size="small" />
                    </div>
                    <div className="userNewReviewForm">
                      <form>
                        <textarea
                          cols={30}
                          rows={8}
                          placeholder="Your Review"
                        />
                        <input
                          type="text"
                          placeholder="Name *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <input
                          type="email"
                          placeholder="Email address *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <div className="userNewReviewFormCheck">
                          <label>
                            <input type="checkbox" placeholder="Subject" />
                            Save my name, email, and website in this browser for
                            the next time I comment.
                          </label>
                        </div>

                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
