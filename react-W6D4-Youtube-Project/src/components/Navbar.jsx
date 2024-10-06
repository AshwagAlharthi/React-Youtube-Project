import React, { useState } from "react";
import youtube from "../assets/youtube.png";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();

  const search = () => {
    if (searchValue) {
      navigate(`/search/${searchValue}`);
    }
  };
  return (
    <div className="navbar bg-white w-full h-8 max-sm:p-0">
      {/* start */}
      <div className="navbar-start w-[25%] h-full">
        <div className="dropdown w-[15%] max-sm:w-[40%]">
          <Sidebar />
        </div>
        <Link to="/">
          <img className="w-28 max-sm:w-14" src={youtube} />
        </Link>
      </div>
      {/* center */}
      <div className="navbar-center gap-3 max-sm:gap-1 w-[55%] h-full">
        <div className="form-control w-[90%]">
          <div className="join w-[100%] rounded-full max-sm:h-9">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input input-bordered join-item border-gray-400 rounded-l-full w-[90%] max-sm:w-[90%] max-sm:h-9 bg-white"
              placeholder="بحث"
            />
            <button
              onClick={search}
              className="btn join-item rounded-r-full btn-outline w-16 max-sm:w-12 h-full bg-gray-300 max-sm:h-9 max-sm:min-h-9 hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="24"
                height="24"
                fill="black"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </button>
          </div>
        </div>
        <button className="btn btn-circle max-sm:w-6 max-sm:h-6 max-sm:min-h-6 max-sm:rounded-[50%] border-none bg-gray-300 hover:bg-slate-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="black"
            className="h-6 w-6 max-sm:h-4 max-sm:w-4"
          >
            <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
          </svg>
        </button>
      </div>
      {/* end */}
      <div className="navbar-end pr-5 max-sm:pr-0 gap-3 w-[22%] max-sm:w-[18%] max-sm:gap-0.5 h-full">
        <button className="btn btn-ghost btn-circle max-sm:w-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            width="24"
            height="24"
            fill="black"
          >
            <path d="M360-320h80v-120h120v-80H440v-120h-80v120H240v80h120v120ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle max-sm:w-4">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="24px"
              // height="24px"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              className="w-[24px] h-[24px] max-sm:w-[18px] max-sm:h-[18px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </button>
        <div className="dropdown dropdown-end max-sm:w-[35%]">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar max-sm:w-[100%]"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Link to="/login">
              <li>تسجيل الخروج</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
