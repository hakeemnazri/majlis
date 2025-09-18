import React from "react";
import NavTitle from "./nav-title";

function Navbar() {
  return (
    <div className="w-full flex items-center border-b gap-2 py-3 px-4">
      <NavTitle />
    </div>
  );
}

export default Navbar;
