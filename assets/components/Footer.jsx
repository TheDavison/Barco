import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <section>
        <Link to="aboutUs">AboutUs</Link>
      </section>
      <section>
        <p>Copyright © 2022 ieshlanz.</p>
      </section>
      <section>
        Coockies
      </section>
    </footer>
  );
};

export default Footer;
