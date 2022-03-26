import ScrollAnimation from "react-animate-on-scroll";
import React, { Component, useEffect, useState } from "react";
import "../style/slider.css";
import { Link } from "react-router-dom";

export function HeroImage() {
  const [state, setState] = useState({
    arrayOfImages: [
      "https://www.workaway.info/gfx/2015/content/frontpage/header_frontpage_1.jpg",
      "https://www.workaway.info/gfx/2015/content/frontpage/header_frontpage_2.jpg",
      "https://www.wildwoodsnowmass.com/content/uploads/2021/08/a3050279482cb2fe21ebd897915f7fab-1-1920x700.jpeg"
    ],
    currentImgLink:
      "https://www.workaway.info/gfx/2015/content/frontpage/header_frontpage_1.jpg",
    imgArrCounter: 0,
  });
  useEffect(() => {
    const interval = setInterval(timer, 4000);
    function timer() {
      if (state.imgArrCounter === state.arrayOfImages.length - 1) {
        setState({
          ...state,
          imgArrCounter:  0,
        });
      }
      if (state.currentImgLink === state.arrayOfImages[state.imgArrCounter]) {
        document.querySelector(".heroImageContainer").style.backgroundColor =
          "rgb(48 36 40)";
        setState({
          ...state,
          currentImgLink: state.arrayOfImages[state.imgArrCounter + 1],
          imgArrCounter: state.imgArrCounter+1,
        });
      } if(state.imgArrCounter===state.arrayOfImages.length - 1) {
        document.querySelector(".heroImageContainer").style.backgroundColor =
          "rgb(48 36 40)";
        setState({
          ...state,
          currentImgLink: state.arrayOfImages[0],
          imgArrCounter: 0,
        });
      }
    }
    return () => {
      clearInterval(interval);
    };
  },[state]);

  const handleToggleClick = (e) => {
    let buttonClass = e.target.className;
    if (buttonClass === "toggle1") {
      setState({
        ...state,
        currentImgLink: state.arrayOfImages[1],
      });
      document.querySelector(".heroImageContainer").style.backgroundColor =
        "rgb(48 36 40)";
    }
    if (buttonClass === "toggle2") {
      setState({
        ...state,
        currentImgLink: state.arrayOfImages[2],
      });
      document.querySelector(".heroImageContainer").style.backgroundColor =
        "rgb(48 36 40)";
    }
    if (buttonClass === "toggle3") {
      setState({
        ...state,
        currentImgLink: state.arrayOfImages[0],
      });
      document.querySelector(".heroImageContainer").style.backgroundColor =
        "rgb(48 36 40)";
    }
  };
  return (
    <div
      className="heroImageContainer"
      style={{
        backgroundImage: `url(${state.currentImgLink})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundColor: "rgb(48 36 40)",
      }}
    >
      <div className="buttonsArea">
        <ScrollAnimation
          animateIn="animate__lightSpeedInLeft"
          initiallyVisible={true}
        >
          <p className="welcome"> Welcome to Traversia Trip Booking Website</p>
          <h1 style={{ color: "white" }}>
            {" "}
            you can use{" "}
            <b style={{ color: "gold" }}>"OCA2022"</b> coupon for 10% Discount
          </h1>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="animate__tada"
          delay={800}
          initiallyVisible={false}
        >
          <button className="shopNowBtn">
            <Link to="/shop">Book now</Link>{" "}
          </button>
        </ScrollAnimation>
        <div className="toggeleSlider">
          <button className="toggle1" onClick={handleToggleClick}></button>
          <button className="toggle2" onClick={handleToggleClick}></button>
          <button className="toggle3" onClick={handleToggleClick}></button>
        </div>
      </div>
    </div>
  );
}

export default HeroImage;
