import React, { useEffect, useState ,useContext } from "react";
import "../style/nav.css";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { UserContext } from '../App'
function Nav() {
  const [state, setState] = useState({
    classNav: "Nav NavCont",
    logoCont: "Nav logoCont",
    middleList: "Nav middleList",
  });
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
  const [switchName, setSwitchName] = useState();
  let laravel =()=>{
    window.location.href = 'http://localhost:8000/users'
  }
  let show = () => {
    if (state.classNav === "Nav NavCont") {
      setState({
        classNav: "toggle NavCont",
        logoCont: "toggle logoCont",
        middleList: "toggle middleList",
      });
    } else if (state.classNav !== "Nav NavCont") {
      setState({
        classNav: "Nav NavCont",
        logoCont: "Nav logoCont",
        middleList: "Nav middleList",
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("loggedUser")) {
      setSwitchName("Profile");
    }
    if (!localStorage.getItem("loggedUser")) {
      setSwitchName("Log In");
    }
  });

  return (
    <>
      <div className={state.classNav}>
        <div className={state.logoCont}>
          <div className="Nav brand">
            <Link to={"/"}>
              <img
                className="Nav logoImg"
                src={logo}
                style={{ height: "80px" }}
                alt="logo"
              />
              <p>Traversia</p>
            </Link>
          </div>
          <img
            id="Btn"
            onClick={show}
            src="https://img.icons8.com/material-rounded/24/000000/menu--v1.png"
            alt="toggle Icon"
          />
        </div>
        <ul className={state.middleList} style={{ listStyle: "none" }}>
          <Link to={"/"}>
            <li className="listItem" onClick={show}>
              Home{" "}
            </li>
          </Link>

          <Link to={"/shop"}>
            <li onClick={show} className="listItem">
              Trips
            </li>
          </Link>
          <Link to={"/cart"}>
            <li onClick={show} className="listItem">
              Reservations
            </li>
          </Link>
          
         { isLoggedIn.isAdmin?<a onClick={laravel}>
            <li className="listItem">
              {" "} Admin dashboard
            </li>
          </a> : <Link to="/account">
            <li onClick={show} className="listItem">
              {" "}
              {switchName}
            </li>
          </Link>}
        </ul>
      </div>
    </>
  );
}

export default Nav;
