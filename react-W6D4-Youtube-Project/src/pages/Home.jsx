import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const API_KEY = "AIzaSyCNpuSWQeboAJiM_MJXVqAVwVsaJGtm6rI";
  const URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=SA&videoCategoryId=0&key=${API_KEY}`;
  const [info, setInfo] = useState([]);

  // const oneDay = 24 * 60 * 60 * 1000;
  // const firstDate = new Date(2008, 1, 12);
  // const secondDate = new Date(2008, 1, 22);

  // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  if (!localStorage.getItem("userId")) {
    navigate("/login");
  }

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

  const getData = () => {
    axios
      .get(URL)
      .then(function (response) {
        // handle success
        console.log(response.data.items);
        setInfo(response.data.items);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center mt-6">
        <div className="w-[90%] flex justify-start items-start flex-wrap gap-2.5 max-sm:w-[95%] max-sm:gap-2">
          {info.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/video/${item.snippet.categoryId}/${item.id}`}
                className="w-[32%] flex flex-col justify-between items-start gap-2 ml-2 mb-2 max-sm:gap-1 max-sm:w-[48.5%] max-sm:ml-0 "
              >
                {localStorage.setItem("categoryId", item.snippet.categoryId)}

                <div className="w-full h-[60%] max-sm:h-[59%]">
                  <img
                    className="w-full h-full rounded-xl hover:rounded-none"
                    src={item.snippet.thumbnails.medium.url}
                    alt=""
                  />
                </div>
                <div className="w-full h-[38%] flex justify-between items-start max-sm:h-[59%]">
                  <div className="w-[13%] h-full">
                    <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:text-[0.7rem] bg-slate-100">
                      {/* <img src={item.snippet.thumbnails.default.url} /> */}
                      
                    </div>
                  </div>
                  <div className="w-[85%] h-full flex flex-col justify-start items-start gap-1 max-sm:gap-0.5">
                    <h2 className="font-bold max-sm:text-[0.4rem]">
                      {item.snippet.title}
                    </h2>
                    <p className="text-[#92999f] text-[0.9rem] max-sm:text-[0.3rem]">
                      {item.snippet.channelTitle}
                    </p>
                    <p className="text-[#92999f] text-[0.9rem] max-sm:text-[0.3rem]">
                      {calculateVlaue(item.statistics.viewCount)} مشاهدة &bull;{" "}
                      {item.snippet.publishedAt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
