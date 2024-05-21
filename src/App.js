import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import SlideImage from "./component/common/SlideImage";
import ProductList from "./component/product/ProductList";
import CartPage from "./component/cart/CartPage";
import ProductDetail from "./component/product/ProductDetail"; // Import ProductDetail component

function App() {
  return (
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
          <Route path="/product/:id" element={<ProductDetail />} />{" "}
          {/* Define route for product details */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
