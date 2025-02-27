import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.jpeg";
import about2 from "../../Assets/About/about-2.jpeg";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>About Stationery Store</h2>
        <img src={about1} alt="" />
        <div className="aboutContent">
          <h3>Our Story</h3>
          <h4>
            At Stationery Store, our journey began with a simple yet passionate
            goal—to bring high-quality, creative, and functional stationery
            products to everyone. Whether you're a student, an artist, a
            professional, or someone who loves organizing, we believe that the
            right stationery can inspire creativity and productivity. Our store
            was founded with the vision of making premium stationery accessible,
            stylish, and affordable. From everyday office essentials to artistic
            supplies and trendy accessories, we carefully curate each product to
            enhance your work, study, and creative pursuits. Join us in
            celebrating the joy of writing, designing, and organizing—one pen,
            notebook, and accessory at a time!.
          </h4>
          <p>
            Over the years, we have grown from a small collection of stationery
            essentials to a diverse range of products that cater to all ages and
            professions. Our commitment to quality, innovation, and customer
            satisfaction drives us to continuously expand our offerings. Whether
            you're looking for elegant notebooks, smart organizers, or artistic
            tools, we strive to bring you the best. At Stationery Store, we
            believe that the right stationery can turn ideas into reality and
            make everyday tasks more enjoyable.
          </p>
          <div className="content1">
            <div className="contentBox">
              <h5>Our Mission</h5>
              <p>
                At Stationery Store, our mission is to inspire creativity,
                enhance productivity, and simplify organization through
                high-quality stationery products. We aim to provide a diverse
                selection of innovative, stylish, and functional stationery that
                caters to students, professionals, and artists alike. Our goal
                is to make premium stationery accessible and affordable while
                ensuring exceptional customer satisfaction.
              </p>
            </div>
            <div className="contentBox">
              <h5>Our Vision</h5>
              <p>
                Our vision is to become the go-to destination for stationery
                lovers, offering a seamless shopping experience with the latest
                trends and timeless essentials. We strive to foster creativity,
                efficiency, and organization by continuously expanding our
                product range and embracing innovation. Through sustainability
                and quality, we envision a world where stationery not only
                enhances productivity but also brings joy and inspiration to
                everyday life.
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt="" />
            </div>
            <div className="textContent">
              <h5>The Company</h5>
              <p>
                Stationery Store is a one-stop shop for all your stationery
                needs, providing high-quality products that blend functionality
                with creativity. From office essentials to artistic supplies, we
                cater to students, professionals, and artists alike. Committed
                to excellent customer service and innovation, we ensure that
                every product meets the highest standards of quality and
                affordability. Our company is built on the values of trust,
                reliability, and a passion for stationery that fuels
                productivity and creativity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      {/* <div className="companyPartners">
        <h5>Company Partners</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div> */}
    </>
  );
};

export default AboutPage;
