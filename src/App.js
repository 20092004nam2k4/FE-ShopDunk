import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import SlideImage from "./component/common/SlideImage";
import ProductList from "./component/product/ProductList";
import CartPage from "./component/cart/CartPage";
import ProductDetail from "./component/product/ProductDetail";
import LoginUser from "./component/user/LoginUser";
import UserProfile from "./component/user/UserProfile";
import { AuthProvider } from "./context/AuthContext";
import RegisterUser from "./component/user/UserRegister";
import CategoryProducts from "./component/product/CategoryProducts"; // Import the new component

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SlideImage />
                  <ProductList />
                </>
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/category/:categoryId"
              element={<CategoryProducts />}
            />{" "}
            {/* Add this line */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
