import React from "react";

const NavbarComp = () => {
  return (
    <>
      <div className="navbar bg-base-100 mb-7 pb-5">
        <div className="navbar-start"></div>
        <div className="navbar-center ">
          <a className="text-2xl font-bold " >WareHouse</a> 
          <p>&copy;</p>
        </div>
        <div className="navbar-end">
          <p className="text-xs font-extralight">Please refresh page after changes*</p>
        </div>
      </div>
    </>
  );
};

export default NavbarComp;
