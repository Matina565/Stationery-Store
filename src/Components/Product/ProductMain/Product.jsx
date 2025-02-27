import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
// import { useParams } from "react-router-dom";
// import StoreData from "../../../Data/StoreData";
import { useDispatch, useSelector } from "react-redux";
import { addToCartWithAuth } from "../../../Features/Cart/cartSlice";
import { useNavigate } from "react-router-dom";

import product1 from "../../../Assets/ProductDetail/productdetail-1.jpg";
import product2 from "../../../Assets/ProductDetail/productdetail-2.jpg";
import product3 from "../../../Assets/ProductDetail/productdetail-3.jpg";
import product4 from "../../../Assets/ProductDetail/productdetail-4.jpg";

import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import "./Product.css";

const Product = () => {
  // Product images Gallery

  const productImg = [product1, product2, product3, product4];
  const [currentImg, setCurrentImg] = useState(0);

  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? productImg.length - 1 : currentImg - 1);
  };

  const nextImg = () => {
    setCurrentImg(currentImg === productImg.length - 1 ? 0 : currentImg + 1);
  };

  // Product Quantity

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Product WishList

  const [clicked, setClicked] = useState(false);

  const handleWishClick = () => {
    setClicked(!clicked);
  };

  // Product Sizes

  const sizes = ["XS", "S", "M", "L", "XL"];
  const sizesFullName = [
    "Extra Small",
    "Small",
    "Medium",
    "Large",
    "Extra Large",
  ];
  const [selectSize, setSelectSize] = useState("S");

  // Product Colors

  const [highlightedColor, setHighlightedColor] = useState("#C8393D");
  const colors = ["#222222", "#C8393D", "#E4E4E4"];
  const colorsName = ["Black", "Red", "Grey"];

  // Product Detail to Redux

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    const productDetails = {
      productID: 14,
      productName: "Aesthetic & Minimalist Notebooks",
      productPrice: 499,
      productImage: product1,
    };

    dispatch(addToCartWithAuth(productDetails))
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

  return (
    <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              <img src={product1} onClick={() => setCurrentImg(0)} alt="" />
              <img src={product2} onClick={() => setCurrentImg(1)} alt="" />
              <img src={product3} onClick={() => setCurrentImg(2)} alt="" />
              <img src={product4} onClick={() => setCurrentImg(3)} alt="" />
            </div>
            <div className="productFullImg">
              <img src={productImg[currentImg]} alt="" />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Home</Link>&nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="prevNextLink">
                <Link to="/product">
                  <GoChevronLeft />
                  <p>Prev</p>
                </Link>
                <Link to="/product">
                  <p>Next</p>
                  <GoChevronRight />
                </Link>
              </div>
            </div>
            <div className="productName">
              <h1>Aesthetic & Minimalist Notebooks</h1>
            </div>
            <div className="productRating">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <p>1k+ reviews</p>
            </div>
            <div className="productPrice">
              <h3>Rs 1500</h3>
            </div>
            <div className="productDescription">
              <p> Aesthetic and minimalist notebooks combine simplicity with
                functionality, offering a sleek and stylish option for those who
                appreciate clean design. With high-quality, smooth paper and
                subtle covers in neutral tones, these notebooks provide a serene
                space for writing, journaling, or sketching. Featuring minimal
                distractions, such as lightly ruled or dot grid pages, they
                promote focus and creativity. Perfect for those who value both
                beauty and practicality, aesthetic and minimalist notebooks are
                ideal companions for everyday use, adding a touch of elegance to
                your workspace.
</p>
            </div>
            <div className="productSizeColor">
              {/* <div className="productSize">
                <p>Sizes</p>
                <div className="sizeBtn">
                  {sizes.map((size, index) => (
                    <Tooltip
                      key={size}
                      title={sizesFullName[index]}
                      placement="top"
                      TransitionComponent={Zoom}
                      enterTouchDelay={0}
                      arrow
                    >
                      <button
                        style={{
                          borderColor: selectSize === size ? "#000" : "#e0e0e0",
                        }}
                        onClick={() => setSelectSize(size)}
                      >
                        {size}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div> */}
              <div className="productColor">
                <p>Color</p>
                <div className="colorBtn">
                  {colors.map((color, index) => (
                    <Tooltip
                      key={color}
                      title={colorsName[index]}
                      placement="top"
                      enterTouchDelay={0}
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <button
                        className={
                          highlightedColor === color ? "highlighted" : ""
                        }
                        style={{
                          backgroundColor: color.toLowerCase(),
                          border: highlightedColor === color
                            ? "2px solid #000"
                            : "2px solid transparent",
                          borderRadius: "50%",
                          padding: "12px",
                          margin: "5px",
                          cursor: "pointer",
                          outline: "none",
                          transition: "all 0.3s ease"
                        }}
                        onClick={() => setHighlightedColor(color)}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
            <div className="productCartQuantity">
              <div className="productQuantity">
                <button onClick={decrement}>-</button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <button onClick={increment}>+</button>
              </div>
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
            <div className="productWishShare">
              <div className="productWishList">
                <button onClick={handleWishClick}>
                  {/* <FiHeart color={clicked ? "red" : ""} size={17} />
                  <p>Add to Wishlist</p> */}
                </button>
              </div>
              <div className="productShare">
                {/* <PiShareNetworkLight size={22} />
                <p>Share</p> */}
              </div>
            </div>
            <div className="productTags">
              {/* <p>
                <span>SKU: </span>N/A
              </p> */}
              {/* <p>
                <span>CATEGORIES: </span>Casual & Urban Wear, Jackets, Men
              </p> */}
              {/* <p>
                <span>TAGS: </span>biker, black, bomber, leather
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
