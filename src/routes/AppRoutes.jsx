import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignUp from "../pages/SignUp";
import Products from "../pages/Products";
import Header from "../components/Header";
import Product from "../pages/Product";
import Paginated from "../pages/Paginated";
import UserData from "../pages/UserData";

const AppRoutes = () => {
  return (
    <Router>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/paginated" element={<Paginated />} />
          <Route path="/userdata" element={<UserData />} />
        </Routes>
      </Header>
    </Router>
  );
};

export default AppRoutes;
