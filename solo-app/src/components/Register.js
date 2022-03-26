import axios from "axios";
import React, { useState , useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../style/accounts.css";
import { UserContext } from '../App'


let fnameValid, lnameValid, emailValid, passwordValid, repasswordValid;

function Register() {
  let navigate = useNavigate();

  // const [fname, setFname] = useState("");
  // const [lname, setlname] = useState("");
  // const [country, setcountry] = useState("");
  // const [phone, setphone] = useState("");
  // const [img, setimg] = useState("");
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  // const [role, setrole] = useState("user");

  // const handleSubmit = (e) => {
  //   if (
  //     fnameValid &&
  //     lnameValid &&
  //     emailValid &&
  //     passwordValid &&
  //     repasswordValid
  //   ) {
  //     //create user in localStorage
  //     let user = {
  //       fname: fname,
  //       lname: lname,
  //       country: country,
  //       phone: phone,
  //       img: img,
  //       email: email,
  //       password: password,
  //       role: role,
  //     };
  //     if (!localStorage.getItem("users")) {
  //       let users = [];
  //       let adminUser = {
  //         fname: "admin",
  //         lname: "admin",
  //         country: "Jordan",
  //         phone: "0777777777",
  //         email: "admin@admin.com",
  //         password: "123321",
  //         role: "admin",
  //       };
  //       users.push(adminUser);
  //       users.push(user);
  //       localStorage.setItem("users", JSON.stringify(users));
  //       alert("Successfully registration !");
  //       navigate("/account");
  //     } else {
  //       let foundEmail = false;
  //       let myUsers = JSON.parse(localStorage.getItem("users"));
  //       for (let i = 0; i < myUsers.length; i++) {
  //         if (myUsers[i].email === email) {
  //           foundEmail = true;
  //           break;
  //         }
  //       }
  //       if (foundEmail) {
  //         e.preventDefault();
  //         alert("Email Found !");
  //       } else {
  //         myUsers.push(user);
  //         localStorage.setItem("users", JSON.stringify(myUsers));
  //         navigate("/account");
  //       }
  //     }
  //   } else {
  //     e.preventDefault();
  //     alert("Edit Data!!!!");
  //   }
  // };
  // const validator = (e) => {
  //   switch (e.target.id) {
  //     case "fname":
  //       if (e.target.value.length >= 3) {
  //         fnameValid = true;
  //         setFname(e.target.value);
  //         document.getElementById("RU-fname").innerText = "";
  //       } else {
  //         fnameValid = false;
  //         setFname("");
  //         document.getElementById(
  //           "RU-fname"
  //         ).innerHTML = `<i class="fas fa-times"></i> First name must be longer than 3 characters`;
  //       }
  //       break;

  //     case "lname":
  //       if (e.target.value.length >= 3) {
  //         lnameValid = true;
  //         setlname(e.target.value);
  //         document.getElementById("RU-lname").innerText = "";
  //       } else {
  //         lnameValid = false;
  //         setlname("");
  //         document.getElementById(
  //           "RU-lname"
  //         ).innerHTML = `<i class="fas fa-times"></i> Last name must be longer than 3 characters`;
  //       }
  //       break;

  //     case "country":
  //       setcountry(e.target.value);
  //       break;

  //     case "phone":
  //       setphone(e.target.value);
  //       break;

  //     case "img-url":
  //       setimg(e.target.value);
  //       break;

  //     case "email":
  //       emailValid = true;
  //       setemail(e.target.value);
  //       break;

  //     case "password":
  //       if (e.target.value.length > 5) {
  //         passwordValid = true;
  //         setpassword(e.target.value);
  //         document.getElementById("RU-password").innerText = "";
  //       } else {
  //         passwordValid = false;
  //         setpassword("");
  //         document.getElementById(
  //           "RU-password"
  //         ).innerHTML = `<i class="fas fa-times"></i> Password must be longer than 5 characters`;
  //       }
  //       break;

  //     case "repassword":
  //       if (e.target.value === password) {
  //         repasswordValid = true;
  //         document.getElementById("RU-repassword").innerText = "";
  //       } else {
  //         repasswordValid = false;
  //         document.getElementById(
  //           "RU-repassword"
  //         ).innerHTML = `<i class="fas fa-times"></i> Password don't match!`;
  //       }
  //       break;

  //     default:
  //       alert("Check id in register file");
  //   }
  // };


  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)


  // let navigate = useNavigate()
  const [inputs, setInputs] = useState([]);
  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }));
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://127.0.0.1:8000/api/register', inputs).then( response =>{
          console.log(response.data);
          localStorage.setItem('loggedUser', JSON.stringify(response.data.user))
          setIsLoggedIn(response.data.user)



          if (response.data.status == "created") {
              // login()
              swal({

                  title: "You are Register in Successfully ",
                  text: "Welcome!",
                  icon: "success",
                  button: "ok ",
              });
              // setTimeout(() => {
              //     navigate('/Farms')
              // }, 3000);

          } else {
              swal({

                  title: "You Have an Account ",
                  text: "Welcome!",
                  icon: "error",
                  button: "ok ",
              });
          }




      }).catch(error=> {
          console.log("registration error", error);
          swal({

              title: "You Have an Account ",
              text: "Welcome!",
              icon: "error",
              button: "ok ",
          });
      });

  }

  return (
    <>
      <div id="accounts-form-container">
        <div>
          <fieldset id="register-fieldset">
            <h1 id="register_heading">Register</h1>
            <form onSubmit={handleSubmit}>
              <div id="register-form">
                <div className="formGroupRegisterMahdi">
                  <label htmlFor="fname">
                    Username : <span className="accounts-important">*</span>{" "}
                  </label>

                  <input
                    type="text"
                    id="fname"
                    name='name'
                    placeholder="User Name"
                    onChange={handleChange}
                    required
                  />
                  <p className="error" id="RU-fname"></p>
                </div>
                <div className="formGroupRegisterMahdi">
                  <label htmlFor="email">
                    Email Address :{" "}
                    <span className="accounts-important">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name='email'
                    placeholder="username@domain.com"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formGroupRegisterMahdi">
                  <label htmlFor="password">
                    Password : <span className="accounts-important">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name='password'
                    className="register-first-password"
                    onChange={handleChange}
                    required
                  />
                  <p className="error" id="RU-password"></p>
                </div>
                <div className="formGroupRegisterMahdi">
                  <label htmlFor="repassword">
                    Repeat Password :{" "}
                    <span className="accounts-important">*</span>
                  </label>

                  <input
                    type="password"
                    id="repassword"
                    onChange={handleChange}
                    required
                  />
                  <p className="error" id="RU-repassword"></p>
                </div>
              </div>
              <div className="formGroupRegisterMahdi">
                <button type="submit" className="accounts-form-btn">
                  Register
                </button>
                <Link to="/account" id="redirect-to-login-mahdi">
                  Already Have an account? Sign in here!
                </Link>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default Register;
