import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Search() {
  const catid = localStorage.getItem("categoryId");
  const API_KEY = "AIzaSyCNpuSWQeboAJiM_MJXVqAVwVsaJGtm6rI";
  let { searchValue } = useParams();
  const searchURL = `https://www.googleapis.com/youtube/v3/search?&key=${API_KEY}&q=${searchValue}&maxResults=20&type=video&part=snippet`;
  const [searchInfo, setSearchInfo] = useState();

  const calculateVlaue = (value) => {
    if (value >= 1000000) {
      return Math.floor(value / 1000000) + " مليون";
    }
    if (value >= 1000) {
      return Math.floor(value / 1000) + " ألف";
    } else {
      return value;
    }
  };

  const getSearchResults = () => {
    axios
      .get(searchURL)
      .then(function (response) {
        // handle success
        console.log(response.data.items);
        setSearchInfo(response.data.items);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getSearchResults();
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center">
        {searchInfo && (
          <div className="w-[95%] h-full flex flex-col justify-evenly gap-2 max-sm:w-full">
            {searchInfo.map((item, index) => {
              return (
                <div className="w-full h-72 flex justify-between items-start max-sm:h-[4.5rem]">
                  <Link
                    key={index}
                    to={`/video/${catid}/${item.id.videoId}`}
                    className=" w-[95%] h-full flex justify-between items-center"
                  >
                    <div className="relative w-[44%] h-full  max-sm:w-[39%]">
                      <img
                        className="w-full h-full rounded-xl hover:rounded-none"
                        src={item.snippet.thumbnails.medium.url}
                        alt=""
                      />
                      {/* <div className="absolute bottom-0 left-0 text-white text-[0.8rem] max-sm:text-[0.6rem] font-bold bg-black bg-opacity-50 rounded-lg px-1.5 mb-1 ml-1">
                        12:33
                      </div> */}
                    </div>
                    <div className="w-[55%] h-full flex flex-col justify-start items-start gap-3 max-sm:w-[59%] max-sm:gap-1 pt-2 pr-1">
                      <div className="w-full flex justify-between items-center">
                        <h2 className="font-semibold text-black text-[1rem] max-sm:text-[0.5rem]">
                          {item.snippet.title.length > 100
                            ? `${item.snippet.title.substring(0, 100)}... `
                            : item.snippet.title}
                        </h2>
                      </div>
                      <p className="text-[#92999f] text-[0.75rem] max-sm:text-[0.3rem]">
                        {item.snippet.channelTitle}
                      </p>
                      <p className="text-[#92999f] text-[0.75rem] max-sm:text-[0.3rem]">
                        {item.snippet.description}
                      </p>
                    </div>
                  </Link>
                  <div className="w-[5%]">
                    <details className="dropdown dropdown-left dropdown-bottom">
                      <summary className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:text-[0.7rem] bg-transparent shadow-none">
                        <svg
                          className="w-6 h-6 text-black"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="black"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M12 6h.01M12 12h.01M12 18h.01"
                          />
                        </svg>
                      </summary>
                      {/* <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] flex flex-col justify-center items-center w-28 h-12 px-2 p-0 shadow"> */}
                      <ul className="menu dropdown-content bg-base-100 min-h-full w-60 px-0 rounded-xl text-[0.78rem] max-sm:text-[0.45rem] text-black z-10 max-sm:w-[9.5rem] max-sm:px-0 ">
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              className="max-sm:w-3 max-sm:h-3"
                            >
                              <path d="M21 16h-7v-1h7v1zm0-5H9v1h12v-1zm0-4H3v1h18V7zm-11 8-7-4v8l7-4z"></path>
                            </svg>
                            <p>الإضافة إلى قائمةالمحتوى التالي</p>
                          </a>
                        </li>
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              className="max-sm:w-3 max-sm:h-3"
                            >
                              <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path>
                            </svg>
                            <p>الحفظ في قائمة "المشاهدة لاحقاً"</p>
                          </a>
                        </li>
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              className="max-sm:w-3 max-sm:h-3"
                            >
                              <path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path>
                            </svg>
                            <p>حفظ في قائمة تشغيل</p>
                          </a>
                        </li>
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              className="max-sm:w-3 max-sm:h-3"
                            >
                              <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
                            </svg>
                            <p>تنزيل</p>
                          </a>
                        </li>
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 500 511.79"
                              className="w-5 h-5 max-sm:w-3 max-sm:h-3"
                            >
                              <path d="m206.18 341.56-14.24-93.1c-.81-5.44 2.95-10.54 8.39-11.35l2.4-.06c53.67 3.7 116.61 14.73 169.8 52.27 45.57 32.17 83.63 83.49 101.96 165.7 3.02-15.35 4.76-30.19 5.35-44.5 3.03-73.7-24.57-133.96-65.3-179.92-41.06-46.32-95.43-78.28-145.41-95.07-24.39-8.21-47.67-12.77-67.71-13.59-5.5-.21-9.78-4.85-9.57-10.35l13.69-76.58L25.4 184.07l180.78 157.49zm7.4-83.63 16.43 107.39c.48 2.85-.26 5.89-2.31 8.23-3.62 4.15-9.93 4.59-14.09.97L3.42 191.42l-1.14-1.18c-3.5-4.24-2.9-10.54 1.34-14.05L213.81 2.27c2.2-1.78 5.12-2.65 8.11-2.11 5.41.96 9.02 6.15 8.05 11.55l-16.4 91.11c19.04 1.87 40.11 6.51 61.87 13.82 52.9 17.77 110.47 51.64 154.02 100.77 43.85 49.48 73.57 114.39 70.29 193.89-1.18 29.08-6.83 60.12-17.81 93-1.01 3.87-4.29 6.92-8.49 7.42-5.47.64-10.45-3.28-11.09-8.74-12.27-102.85-52.06-162.58-101.31-197.34-45.5-32.1-99.5-43.39-147.47-47.71z" />
                            </svg>
                            <p>مشاركة</p>
                          </a>
                        </li>
                        <div className="divider m-0"></div>
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              className="max-sm:w-3 max-sm:h-3"
                            >
                              <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM3 12c0 2.31.87 4.41 2.29 6L18 5.29C16.41 3.87 14.31 3 12 3c-4.97 0-9 4.03-9 9zm15.71-6L6 18.71C7.59 20.13 9.69 21 12 21c4.97 0 9-4.03 9-9 0-2.31-.87-4.41-2.29-6z"></path>
                            </svg>
                            <p>لايهمني</p>
                          </a>
                        </li>
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              className="max-sm:w-3 max-sm:h-3"
                            >
                              <g>
                                <path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z"></path>
                              </g>
                            </svg>
                            <p>عدم اقتراح القناة</p>
                          </a>
                        </li>
                        <li>
                          <a className="flex justify-start items-center max-sm:py-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="max-sm:w-3 max-sm:h-3"
                            >
                              <path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path>
                            </svg>
                            <p>إبلاغ</p>
                          </a>
                        </li>
                      </ul>
                    </details>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
