import React, { useEffect, useState } from "react";
// import product from "./products.json";
import "../style/shop.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import * as React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Slider } from "@mui/material";
//import  {makeStyles}  from '@material-ui/core/styles';


// const useStyles = makeStyles(() => ({
//   inputRoot: {
//     width: '150px',
//     marginTop: '0'
//   },

//   label: {
//     justifyContent: 'space-between',
//     width: '100%'
//   },
//   paper: { borderRadius: 25 },
//   thumb: {
//     color: 'white',
//     border: '2px solid gray',
//     height: 24,
//     width: 24,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit'
//     }
//   },
//   track: {
//     color: '#3EDDB8',
//     height: '14px',
//     borderRadius: 6
//   },
//   rail: {
//     color: 'gray',
//     height: '14px',
//     borderRadius: 6
//   }
// }));
function Shop() {
  const [shop, setShop] = useState();
  const [countries, setCountries] = useState();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [visibility, setvisibility] = useState();
  const [value, setValue] = useState();

  const [all, setall] = useState();
  let cartArr = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  const [cart, setCart] = useState(cartArr);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(shop));
    if (
      !localStorage.getItem("cartItems") ||
      localStorage.getItem("cartItems") === "[]"
    ) {
      setvisibility("hidden");
      localStorage.setItem("visibility", JSON.stringify("hidden"));
    } else {
      setvisibility("visible");
      localStorage.setItem("visibility", JSON.stringify("visible"));
    }
  });
  useEffect(() => {
    // const fetch = ()=>{
    axios.get("http://localhost:8000/api/trips").then((res) => {
      console.log(res.data);
      setShop(res.data.trips);
      setFilter(res.data.trips);
      setCountries(res.data.countries);
      setall(res.data.trips);
      // setCart(res.data.trips);
    });
    // fetch()
  }, []);
  if (countries) {
    console.log(countries);
  }
  const filtering = (e) => {
    switch (e.target.value) {
      case "all":
        setShop(all);
        break;
      case e.target.value:
        setShop(all.filter((item) => item.cat_id == e.target.value));
        break;
    }
  };

  const filterPrice = (e, newValue) => {
    switch (e.target.value) {
      case e.target.value:
        setValue(newValue);
        setShop(all.filter((item) => item.price <= value));
        break;
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search != "") {
      setShop(
        all.filter(
          (item) =>
            item.name.toLowerCase().match(search.toLowerCase()) ||
            item.description.toLowerCase().match(search.toLowerCase())
        )
      );
    } else {
      setShop(filter);
    }
  };
  const addToCartHandler = (item) => {
    let exist = false;
    cartArr.forEach((element) => {
      if (element.id === item.id) {
        exist = true;
      }
    });
    if (!exist) {
      cartArr.push(item);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartArr));
    setCart(cartArr);
  };
  let products = shop ? (
    shop.map((item, key) => (
      item.capacity?
      <Link to={"/singlepage/" + item.id}>
        <div className="itemCont" key={key}>
          <img className="itemImg" src={item.image} />
          <p>{item.name}</p>
          <h3 style={{ color: "goldenrod" }}> JOD {item.price}</h3>
          <h4> {item.description}</h4>
          <h4>
            {" "}
            {item.date} for {item.days} Days
          </h4>
          {/* <p>color : {item.color}</p> */}
          <button
            className="addToCart"
            value={item.id}
            onClick={(e) => addToCartHandler(item)}
          >
            View Deal
          </button>
        </div>
      </Link>
      :""))
      ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
  const deleteItem = (item) => {
    cartArr.forEach((element) => {
      if (element.id === item.id) {
        cartArr = cartArr.filter((element) => element.id !== item.id);
        setCart(cartArr);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartArr));
    });
  };

  let inCart = cart.map((item, key) => (
    <div className="sideCart" key={key}>
        <Link to={"/singlepage/" + item.id}>
        <img className="cartSideImg" src={item.image} />
        <div>{item.name} </div>
        <div style={{ color: "goldenrod" }}>JOD {item.price} </div>
    </Link>
        <button value={item.id} onClick={(e) => deleteItem(item)}>
          X
        </button>
      </div>
  ));

  let a = JSON.parse(localStorage.getItem("visibility"));
  return (
    <div className="shopHoleCont">
      <div id="cartDiv" style={{ visibility: a }}>
        <p> Similar Destinations : </p>
        {inCart}
        {/* <Link to="/cart">
          <button>View Cart</button>
        </Link> */}
      </div>
      <div className="shopCont">
        <div className="searchOverlay">
          <input
            className="shopSearch"
            value={search}
            onChange={handleSearch}
            placeholder="search.."
          ></input>
          <select className="categories" onChange={filtering}>
            <option disabled value={"Categories"}>
              Categories
            </option>
            <option className="options" value={"all"}>
              All Countries
            </option>
            {countries
              ? countries.map((element) => (
                  <option className="options" value={element.id}>
                    {element.name}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
      <div className="items">{products}</div>
      <div style={{marginRight:'2em'}}>
        <h2 style={{textAlign:'center'}}>Price Filter</h2>
        <Slider
          aria-label="price"
          defaultValue={30}
          // getAriaValueText={valuetext}
          onChange={filterPrice}
          valueLabelDisplay="auto"
          value={value}
          step={50}
          marks
          min={0}
          defaultValue={400}
          max={1000}
        />
      </div>
    </div>
  );
}

export default Shop;
