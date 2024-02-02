import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";


import {
  BrowserRouter as Router,
  Routes,
  // Navigate,
  Route,
  Navigate
} from "react-router-dom"
import Success from "./pages/Success";
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector(state => state.user.currentUser) ;
  //const user = false;
  //console.log("User State" , user);
  console.log(user);
    return (
      <Router>
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/products/:category" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/success" element={<Success/>} />

        <Route path="/login" 
         element={ user ? <Navigate to ="/"/> : <Login/>} />
        <Route path="/register" element={ user ? <Navigate to ="/"/> : <Register/>}/>
        </Routes>
      </Router>
    )
  };
  
export default App;