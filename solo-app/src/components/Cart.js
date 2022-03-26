import ScrollAnimation from "react-animate-on-scroll";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/cart.css";
import axios from "axios";
function Cart() {
  let cartArray = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  const [state, setState] = useState(1);
  const [Cart, setCart] = useState(cartArray);
  let Navigate = useNavigate();
  let total = 0;
  cartArray.forEach((element) => {
    return (total = total + element.count * element.price);
  });
  localStorage.setItem("totalPrice", total);
  const plus = (id) => {
    cartArray.forEach((element) => {
      if (element.id === id) {
        if (element.count < 10) {
          element.count += 1;
          setState(element.count);
          setCart(cartArray);
        }
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartArray));
  };

  useEffect(() => {
    // const fetch = ()=>{ 
    axios.get("http://localhost:8000/api/trips").then((res)=>{
    console.log(res.data.trips)
    // setCart(res.data.trips);
  })
    // fetch()
  },[]);

  const minus = (id) => {
    cartArray.forEach((element) => {
      if (element.id === id) {
        if (element.count>1) {
          element.count -= 1;
          setState(element.count);
          setCart(cartArray);
        } else {
          cartArray = cartArray.filter((element) => element.id !== id);
          setCart(cartArray);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(cartArray));
    });
  };

  const deleteItem = (item) => {
    cartArray.forEach((element) => {
      if (element.id === item.id) {
        setCart(cartArray.filter((element) => element.id !== item.id));
        localStorage.setItem(
          "cartItems",
          JSON.stringify(cartArray.filter((element) => element.id !== item.id))
        );
      }
    });
  };
  let cart = Cart.map((item, key) => (
    <div className="cartItem" key={key}>
      <img className="cartItemImg" src={item.image} alt={item.alt} />
      <div className="cartInfo">
        <p className="cartItemName">
          {item.name} - {item.texture}
        </p>
        <p>color: {item.color}</p>
      </div>
      <h3 className="cartItemPrice">JOD {item.price}</h3>
      <div className="cartBtns">
        <button value={item.id} onClick={(e) => minus(e.target.value)}>
          -
        </button>
        {item.count}
        <button value={item.id} onClick={(e) => plus(e.target.value)}>
          +{" "}
        </button>
        <button value={item.id} onClick={(e) => deleteItem(item)}>
          X
        </button>
      </div>
    </div>
  ));
  const checkoutHandler = () => {
    if (localStorage.getItem("logged_in")) {
      Navigate("/checkout");
    } else {
      Navigate("/account");
    }
  };
  if (cartArray.length) {
    return (
      <div className="cartCont">
        {cart}
        <h2>
          <b>Total price: JOD {total}</b>
        </h2>
        <div>
          <Link to="/shop">
            <button>Add Item</button>
          </Link>{" "}
          <button onClick={checkoutHandler}>Check Out</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cartCont">
        <img
          className="emptyCartImg"
          src="https://redifo.com/public/images/empty-cart.png"
          alt="empty cart"
        />
        <ScrollAnimation animateIn="animate__tada" initiallyVisible={true}>
          <Link to="/shop">
            <button className="emptyCartBtn">Add Item</button>
          </Link>{" "}
        </ScrollAnimation>
      </div>
    );
  }
}
export default Cart;
