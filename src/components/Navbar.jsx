import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  console.log(props.msg);
  return (
    <div className="w-full h-16 bg-slate-200 flex justify-between items-center pl-8 pr-8 ">
      <Link to="/">
        <p className=" font-semibold ">SHOPPING</p>
      </Link>

      <p className="font-semibold ">{props.msg}</p>
      <Link to="/cart">
        {" "}
        <p className="font-semibold ">Show Cart Items</p>
      </Link>
    </div>
  );
}

export default Navbar;
