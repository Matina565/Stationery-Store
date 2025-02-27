import React, { useState } from "react";
import "./ShopDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCartWithAuth } from "../../../Features/Cart/cartSlice";

import Filter from "../Filters/Filter";
import { Link, useNavigate } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([...StoreData]);
  const [currentSort, setCurrentSort] = useState("default");

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addToCartWithAuth(product))
      .unwrap()
      .catch((error) => {
        toast.error(error, {
          duration: 2000,
          style: {
            backgroundColor: "#ff4b4b",
            color: "white",
          },
        });
        navigate("/loginSignUp");
      });
  };

  const handleSort = (e) => {
    const sortType = e.target.value;
    setCurrentSort(sortType);
    
    let sorted = [...StoreData];
    switch (sortType) {
      case "featured":
        // For featured, we'll keep the original order
        break;
      case "bestSelling":
        sorted.sort((a, b) => {
          const reviewsA = parseInt(a.productReviews.replace("k+ reviews", "").replace(",", ""));
          const reviewsB = parseInt(b.productReviews.replace("k+ reviews", "").replace(",", ""));
          return reviewsB - reviewsA;
        });
        break;
      case "a-z":
        sorted.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "z-a":
        sorted.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "lowToHigh":
        sorted.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "highToLow":
        sorted.sort((a, b) => b.productPrice - a.productPrice);
        break;
      case "oldToNew":
        // Since we don't have date fields, we'll use ID as a proxy for date
        sorted.sort((a, b) => a.productID - b.productID);
        break;
      case "newToOld":
        sorted.sort((a, b) => b.productID - a.productID);
        break;
      default:
        // Default sorting - restore original order
        sorted = [...StoreData];
    }
    setSortedProducts(sorted);
  };

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select 
                  name="sort" 
                  id="sort" 
                  value={currentSort}
                  onChange={handleSort}
                >
                  <option value="default">Default Sorting</option>
                  <option value="featured">Featured</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, Low to high</option>
                  <option value="highToLow">Price, high to low</option>
                  <option value="oldToNew">Date, old to new</option>
                  <option value="newToOld">Date, new to old</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {sortedProducts.slice(0, 6).map((product) => (
                  <div className="sdProductContainer">
                    <div className="sdProductImages">
                      <Link to="/Product" onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt=""
                          className="sdProduct_front"
                        />
                        <img
                          src={product.backImg}
                          alt=""
                          className="sdProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="sdProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p></p>
                        {/* <FiHeart
                          onClick={() => handleWishlistClick(product.productID)}
                          style={{
                            color: wishList[product.productID]
                              ? "red"
                              : "#767676",
                            cursor: "pointer",
                          }}
                        /> */}
                      </div>
                      <div className="sdProductNameInfo">
                        <Link to="/product" onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>

                        <p>Rs.{product.productPrice}</p>
                        <div className="sdProductRatingReviews">
                          <div className="sdProductRatingStar">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>
                          <span>{product.productReviews}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                <p onClick={scrollToTop}>
                  <FaAngleLeft />
                  Prev
                </p>
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  <p onClick={scrollToTop}>1</p>
                  <p onClick={scrollToTop}>2</p>
                  <p onClick={scrollToTop}>3</p>
                  <p onClick={scrollToTop}>4</p>
                </div>
              </div>
              <div className="sdPaginationNext">
                <p onClick={scrollToTop}>
                  Next
                  <FaAngleRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
