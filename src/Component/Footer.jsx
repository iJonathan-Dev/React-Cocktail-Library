import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div id="footer">
      <p>
        ©{" "}
        <span id="copyright_year">
          {new Date().getFullYear()} Cocktail Library App by{" "}
          <a href="https://www.linkedin.com/in/ijonathan/" target="_blank">
            Ignatius Jonathan
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
