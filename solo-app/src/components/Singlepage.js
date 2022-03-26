import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Singlepage = () => {
  const [singleTrip, setsingleTrip] = useState();
  const { id } = useParams();
  useEffect(() => {
    // const fetch = ()=>{
    axios.get("http://localhost:8000/api/trips").then((res) => {
      setsingleTrip(res.data.trips);
      // setCart(res.data.trips);
    });
    // fetch()
  }, []);
  let singleItem = [];
  if (singleTrip)
    singleTrip.map((element) => {
      if (element.id == id) {
        singleItem.push(element);
      }
    });


    const bookHandler = () => {    
        localStorage.setItem("bookItem", JSON.stringify(singleItem));
      };



  console.log(singleItem);
  return (
    <>
      <div style={{ width: "100%", display: "flex" ,marginTop:'3em'}}>
      {singleTrip ?<img
          src={ singleItem[0].image}
          style={{ width: "50%", height: "25em", margin: "0 auto" ,  borderRadius: '5em'}}
        />:<h3 style={{width:'50%', textAlign:'center', marginTop:'7em'}}>please wait</h3>}
      
      <div className=""
      style={{width:'50%', textAlign:'center' , wordSpacing:'0.5em', marginTop:'2em'}}>
        <div className="">
          <h2 className="">
          {singleTrip ? "":
          <Box sx={{ display: "flex" , justifyContent:'center'}}>
                <CircularProgress />  
              </Box>}
              Trip :  {" "}
            {singleTrip ? (
               singleItem[0].name
            ) : (
             " "
            )}
          </h2>
        </div>
        <h3 className="">
          Description : {" "}
          {singleTrip ? (
            singleItem[0].description
          ) : (
            "Please Wait"
          )}
        </h3>
        <h3 className="">
          Brief :{" "}
          {singleTrip ? (
            singleItem[0].brief
          ) : (
           " "
          )}
        </h3>
        <h3 className="">
          {"Date : "}
          {singleTrip ? (
            singleItem[0].date
          ) : (
            " "
          )}
        </h3>
        <h3 className="">
          {"Duration :  "}
          {singleTrip ? (
            singleItem[0].days
          ) : (
            " "
          )} Days
        </h3>
        <h3 className="">
          {" Capacity : "}
          {singleTrip ? (
            singleItem[0].capacity
          ) : (
            " "
          )} Person
        </h3>
        <h3 className="">
          {"Price : "}
          {singleTrip ? (
            singleItem[0].price
          ) : (
            " "
          )} JOD
        </h3>
        <div className="cartBtns">
        </div>
       <Link to="/checkout">
       <button onClick={bookHandler} >
            BOOK NOW
          </button>
          </Link>
      </div>
      </div>
    </>
  );
};

export default Singlepage;
