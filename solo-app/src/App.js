import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style/App.css";
import Nav from "./components/Nav";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Checkout from "./components/CheckOut";
import PlacedOrder from "./components/PlacedOrder";
import { useState , createContext} from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import HeroImage from "./components/Home";
import { useEffect } from "react";
import Singlepage from "./components/Singlepage";
export const UserContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [items, setitems] = useState(JSON.parse(localStorage.getItem("items")));
  const handleChangeRole = () => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("loggedUser")));
  };

  useEffect(() => {
    const myUser = (localStorage.getItem('loggedUser'))
        ? JSON.parse(localStorage.getItem('loggedUser')) : [];
        setIsLoggedIn(myUser)
}, [])


  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }} >
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HeroImage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/placedOrder" element={<PlacedOrder />} />
        <Route path="/register" element={<Register />} />
        <Route path="/singlepage/:id" element={<Singlepage />} />
        <Route
          path="/account"
          element={<Login handleChangeRole={handleChangeRole} />}
        />
      </Routes>
      <Footer />
    </Router>
    </UserContext.Provider>
  );
}

export default App;
