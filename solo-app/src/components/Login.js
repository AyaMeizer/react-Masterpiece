import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { UserContext } from "../App";
import "../style/accounts.css";
import "../style/profileOrders.css";
function Login(props) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  let navigate = useNavigate();
  const [orders, setOrders] = useState(
    
  );
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrormsg] = useState();
  const [update, setUpdate] = useState(0)

  const [inputs, setInputs] = useState([]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };
  useEffect(() => {
    // const fetch = ()=>{
    axios.get("http://localhost:8000/api/viewRes").then((res) => {
      console.log(res.data.reservation[0]);
      setOrders(res.data.reservation[0]);
      // setCart(res.data.trips);
    });
    // fetch()
  }, []);
  let cart=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
  let reservation=localStorage.getItem('reservation')?JSON.parse(localStorage.getItem('reservation')):[]
  const handleSubmit = (e) => {
    e.preventDefault();
    // for (let i = 0; i <= localStorage.length; i++) {
    //     const user = JSON.parse(localStorage.getItem('User'));

    //     if (user[i].email ===email && user[i].password === password) {
    //         localStorage.setItem('loggedUser', JSON.stringify(user))
    //         // alert('Successful Login');

    //     } else {
    //         setErrormsg('The Email or Password incorrect')
    //     }
    // }
    axios
      .post("http://127.0.0.1:8000/api/login", inputs)
      .then((response) => {
        console.log(response.data);
        if (response.data[0] === "Not Matched") {
          swal({
            title: "You entered the wrong email or password",
            text: "Welcome!",
            icon: "error",
            button: "ok ",
          });
        } else {
          setIsLoggedIn(response.data.user);
          localStorage.setItem(
            "loggedUser",
            JSON.stringify(response.data.user)
          );
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("registration error", error);
        swal({
          title: "You entered the wrong email or password",
          text: "please try again!",
          icon: "error",
          button: "ok ",
        });
      });
  };

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const logout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("selected");
    localStorage.removeItem("temp");
    props.handleChangeRole();
    navigate("/account");
  };
  const clearHistory = () => {
    localStorage.removeItem("Orders");
    setUpdate(1);
  };
  // let values = orders?orders.map((item, index) => (
  //   <span className="billProducts" key={index}>
  //     <span>
  //       {index + 1}- {item.name } * { item.count}
  //     </span>
  //     <span>{item.price}Jd</span>
  //   </span>
  // )):"";
  if (!user) {
    return (
      <div id="accounts-form-container">
        <div className="login-container">
          <fieldset id="login-fieldset">
            <h1 className="login-title">Login</h1>
            <form id="login-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login_email">
                  Email Address <span className="accounts-important">*</span>
                </label>
                <br />
                <input
                  type="email"
                  id="login_email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="login_password">
                  Password <span className="accounts-important">*</span>
                </label>
                <br />
                <input
                  type="password"
                  id="login_password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div id="remember-me-container"> */}
              <div className="btn-login">
                <button type="submit" className="accounts-form-btn">
                  Log in
                </button>
              </div>

              {/* </div> */}
              <div className="a-login">
                <Link to="/register" className="a-login">
                  Don't have an account? Signup here!
                </Link>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div id="accounts-form-container">
          <div id="profileContainer">
            <div id="userProfile">
              <div>
                {/* <img
                  src={logged_user.img}
                  alt="user Profile"
                  onError={badImage}
                /> */}
              </div>
              <div className="dataContainer">
                <div>
                  <p>Full Name : {user.name}</p>
                </div>
                <div>
                  <p id="email_account">Email Address: {user.email}</p>
                </div>
                <div>
                  <button type="button" onClick={logout} id="logoutBtn">
                    Log out !
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <h2 style={{verticalAlign: 'middle',textAlign:'center'}}>Reservations</h2>
          <table className="table table-data2" style={{margin: '0 auto', width:'70%',border:'solid black 1px'}}>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Trip</th>
                            <th>Phone</th>
                            <th>Number of Passengers</th>
                            <th>Price</th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody> 
                        <tr className="border" style={{verticalAlign: 'middle',textAlign:'center'}}>
                          {/* {reservation?reservation.map((item) => ( */}
                            <>
                            <td>{reservation.username }</td>
                            <td>{cart[0].name }</td>
                            <td>{reservation.phone }</td>
                            <td>{reservation.capacity}</td>
                            <td>{reservation.price}</td>
                            <td>{orders?orders.status:""}</td>
                            </>
                          {/* )):""} */}
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
    )}
}

export default Login;
