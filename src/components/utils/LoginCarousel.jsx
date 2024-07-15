// SliderSignin.js
import React, { useState } from "react";
import Slider from "react-slick";
import "../styles/sliderCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image1 from "../assets/signin img1.png";
import Image2 from "../assets/signin img2.png";
import Image3 from "../assets/signin img3.png";
import Image4 from "../assets/signin img4.png";

const SliderSignin = () => {
  const data = [
    {
      id: 1,
      title: "What’s new ?",
      cuisine:
        "We're thrilled to introduce new features and enhancements to elevate your training experience. Discover what's in store for you.",
      imageUrl: Image1,
    },
    {
      id: 2,
      title: "Feature Spotlight",
      cuisine:
        "We're thrilled to introduce new features and enhancements to elevate your training experience. Discover what's in store for you.",
      imageUrl: Image2,
    },
    {
      id: 3,
      title: "Live Virtual Workshops",
      cuisine:
        "We're thrilled to introduce new features and enhancements to elevate your training experience. Discover what's in store for you.",
      imageUrl: Image3,
    },
    {
      id: 4,
      title: "Interactive Assessments",
      cuisine:
        "We're thrilled to introduce new features and enhancements to elevate your training experience. Discover what's in store for you.",
      imageUrl: Image4,
    },
  ];

  const [rotateDots, setRotateDots] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Adjust the speed as needed
    autoplay: true,
    autoplaySpeed: 4000, // Set the autoplay speed to 5 seconds
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    fade: true,
    // beforeChange: (current, next) => {
    //   // Check if the next slide will be the first one
    //   if (next === 0) {
    //     setRotateDots(false);
    //   }
    // },
    // afterChange: (current) => {
    //   // Check if the current slide is the first one after completing one round
    //   if (current === 3 ) {
    //     setRotateDots(true);
    //   }
    // },
  };

  return (
    <div className={`w-[100%] rounded-tr-[3px] rounded-tl-[3px] bg-[#2676C2]  ${rotateDots ? "rotate-dots" : ""}`}>
      <Slider {...settings}>
        {data.map((slide) => (
          <div key={slide.id}>
            <div className="md:my-10 md:mx-5 flex flex-col-reverse items-start md:flex md:flex-row md:justify-evenly md:items-center">
              <div className="slider-content">
                <h2 className=" text-[14px] md:text-xl lg:text-3xl font-semibold leading-4 md:leading-10 lg:leading-[45px]">
                  {slide.title}
                </h2>
                <p className="text-[12px] md:text-[14px] lg:text-lg">{slide.cuisine}</p>
              </div>
              <div className="slider-image ">
                <img
                  className=" flex-shrink-0 w-[800px]"
                  src={slide.imageUrl}
                  alt={slide.title}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSignin;
