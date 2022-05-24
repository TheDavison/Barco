import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer__container">
      <section className="footer__section">
        <p>Copyright © 2022 ieshlanz.</p>
      </section>

      <section className="footer__section">
        <Link to="aboutUs">AboutUs</Link>
      </section>

      <section className="footer__section">
        Coockies
      </section>
    </div>
  );
};

export default Footer;
