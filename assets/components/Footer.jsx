import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <section>
        <Link to="aboutUs">AboutUs</Link>
      </section>
      <section>
        <p>Copyright © 2022 ieshlanz. Todos los derechos reservadosp.</p>
      </section>
      <section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde
        voluptatem dicta inventore illum dignissimos, rerum et, ipsam soluta
        quae pariatur distinctio! Debitis laborum rem iste, architecto aperiam
        minima ipsum.
      </section>
    </footer>
  );
};

export default Footer;
