import PlacedOrder from "./PlacedOrder";
import "../style/checkout.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Checkout() {
  const [loggedUser , setLoggedUser]=useState( localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : [])

  const [orders , setOrders]=useState( localStorage.getItem("bookItem")
  ? JSON.parse(localStorage.getItem("bookItem"))
  : [])

  const [state, setState] = useState({
    submitState: "",
    username: "",
    coupon: "OCA2022",
    copVal: 0,
  });
  const Navigate = useNavigate();
  useEffect(() => {
   if(!localStorage.getItem("loggedUser")){
    Navigate("/account")
   }
   else if(!localStorage.getItem("bookItem")||localStorage.getItem("bookItem")==="[]"){
     Navigate("/shop")
   }
  }, [])
  
  const submitted = (e) => {
    e.preventDefault();
    // setState({ submitState: "submitted" });
    axios.post('http://localhost:8000/api/insertReservation',orders).then((response)=>{
      console.log(response.data);
    })
    Navigate("/placedOrder");
    console.log(orders);


    // ${loggedUser.id}



    // localStorage.setItem(
    //   "orderedPrice",
    //   Math.round(Number(total() * state.copVal + total()) * 100) / 100
    //   );
    //   if(localStorage.getItem("Orders")){
    //     data= [...data, ...JSON.parse(localStorage.getItem("Orders"))]
    //     localStorage.setItem("Orders", JSON.stringify(data))
    //   }else{
    //           localStorage.setItem("Orders", JSON.stringify(data));

    //   }
      localStorage.removeItem("bookItem");
  };
  const validation = (e) => {
    setState({ ...state, username: e.target.value });
  };
  let data = [];
  data = localStorage.getItem("bookItem")?JSON.parse(localStorage.getItem("bookItem")):[];
  let total = () => {
    let totalAmount = 0;
    data.forEach((element) => {
      return (element.price);
    });
    return totalAmount;
  };
  let values = data.map((item, index) => (
    <span className="billProducts" key={index}>
      <span>
       {item.name}
      </span>
      <span>{item.price}Jd</span>
    </span>
  ));
  let couponHandler = (e) => {
    if (e.target.value === state.coupon) {
      setState({ ...state, copVal: 0.1 });
      document.querySelector(".totalTaxes1").style.color = "red";
    }
  };
  if (state.submitState !== "submitted") {
    return (
      <div className="checkoutPageContainer">
        <form className="form" onSubmit={submitted}>
          <div className="checkCont">
            <div className="formSection">
              <h3 className="formTitle">Please fill your information</h3>
              <div>
                <span>Personal Information:</span>
                <input
                  onChange={(e) => validation(e)}
                  value={state.username}
                  type="text"
                  placeholder="User Name"
                  className="formInputs userName"
                  required
                ></input>
                <input
                  type="email"
                  placeholder="Email"
                  className="formInputs email"
                  required
                ></input>
              </div>
              <div>
                <span>Address Information:</span>
                <input
                  type="text"
                  placeholder="Country"
                  className="formInputs address"
                  required
                ></input>
                <input
                  type="text"
                  placeholder="City"
                  className="formInputs address"
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Address 2 / optional"
                  className="formInputs address"
                ></input>
              </div>
              <div>
                <br />
                <h3>Payment Method</h3>
                <div>
                  <input
                    type="checkbox"
                    value="cash"
                    name="cash"
                    id="cash"
                    placeholder="Cash"
                    required
                  ></input>
                  <label htmlFor="cash">Cash on delivery</label>
                </div>
                <br />
                <button
                  value="Place your order"
                  // className="formInputs checkSubmit"
                >
                  Place your order
                </button>
              </div>
            </div>
            <div className="bill">
              <label htmlFor="coupon">Enter a coupon</label>
              <input
                id="coupon"
                className="formInputs address"
                placeholder="Coupon"
                onChange={couponHandler}
              ></input>
              <div className="billCard">
                <h3 className="billTitle">Your Order</h3>
                <span className="products"> {values} </span>
                <hr />
                <span className="totalTaxes">
                  Purchase
                  <span>{data[0].price} Jd</span>
                </span>
                <span className="totalTaxes totalTaxes1">
                  Discount
                  <span> {-data[0].price* state.copVal } Jd</span>
                </span>
                <hr />
                <div className="totalSection">
                  <span>Total: </span>
                  <span className="totalPrice">
                    {Math.round(
                      Number(data[0].price-data[0].price* state.copVal)
                    )}{" "}
                    Jd
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="orderMessage">
        {" "}
        <lLink to="/placedOrder">
          <PlacedOrder />
        </lLink>
      </div>
    );
  }
}
