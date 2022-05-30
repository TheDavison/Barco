import React from "react";
import { Link, Outlet } from "react-router-dom";
import Admin from "./Admin";

const AdminLayout = () => {
  return (
    <div className="layout__container">
      <Admin />
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
