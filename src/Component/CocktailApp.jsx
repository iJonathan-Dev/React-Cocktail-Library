import React from "react";
import Home from "./Home";
import Footer from "./Footer";

export const CocktailApp = () => {
  return (
    <div className="app">
      <div className="content">
        <Home />
      </div>
      <Footer />
    </div>
  );
};

export default CocktailApp;
