import React, { useState, useEffect , useContext} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { UserContext } from '../App'
import "../style/accounts.css";
import "../style/profileOrders.css";

function Login(props) {
 





  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
  
    let navigate = useNavigate()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMsg, setErrormsg] = useState();


    const [inputs, setInputs] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        console.log(inputs);
    }



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
        axios.post('http://127.0.0.1:8000/api/login', inputs).then(response => {
            console.log(response.data);
            if (response.data[0] === 'Not Matched') {
                swal({

                    title: "You entered the wrong email or password",
                    text: "Welcome!",
                    icon: "error",
                    button: "ok ",
                });
            } else {
              setIsLoggedIn(response.data.user)
                localStorage.setItem('loggedUser', JSON.stringify(response.data.user))
                navigate('/')

            }
        }).catch(error=> {
            console.log("registration error", error);
            swal({

                title: "You entered the wrong email or password",
                text: "please try again!",
                icon: "error",
                button: "ok ",
            });
        });



    }
 




  

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
                    name='email'
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
                    name='password'
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
}

export default Login;
