import React from "react";
import HeroImage from "./HeroImg";
import product from "./products.json";
import ScrollAnimation from "react-animate-on-scroll";
import "../style/home.css"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
    import Box from '@mui/material/Box';
function Home() {
  const [Featured , setFeatured] = useState("")
  useEffect(() => {
    // const fetch = ()=>{
    axios.get("http://localhost:8000/api/trips").then((res) => {
      console.log(res.data.trips);
      setFeatured(res.data.trips);
     
      // setCart(res.data.trips);
    });
    // fetch()
  }, []);
  const sales = Featured?Featured.map((element, key) => {
    if (element.brief == "featured") {
      return (
        <div className="featuredItem" key={key}>
          <img className="featuredImg" src={element.image} />
          {element.name}
        </div>
      );
    }
  }):  <Box sx={{ display: 'flex' }}>
  <CircularProgress />
</Box>;
  return (
    <div>
      <HeroImage />
          <h2 className="feaTitle">Featured Trips</h2>
          <ScrollAnimation
          animateIn="animate__fadeInUp"
          initiallyVisible={false} delay={20} duration={0.7}>
      <div className="featuredCont">
          {sales}</div>
        </ScrollAnimation>
        <div>
          <div className="salesImg">
          <div className="salesOverlay">
            <p className="salesTitle">Visit Our Website to see new trips collection. <pre></pre>
            Dont forget to use "OCA2022" coupon to get a 10% discount!!</p>
          </div>
        </div>
            </div>
    </div>
  );
}

export default Home;
