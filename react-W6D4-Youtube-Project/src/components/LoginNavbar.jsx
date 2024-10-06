import React from "react";
import youtube from '../assets/youtube.png'

function LoginNavbar() {
  return (
    <div className="navbar bg-gray-100 w-full h-8 max-sm:p-0">
      <div className="navbar-start w-[25%] h-full">
        <img className="w-28 max-sm:w-24 max-sm:pr-4" src={youtube} />
      </div>
    </div>
  );
}

export default LoginNavbar;