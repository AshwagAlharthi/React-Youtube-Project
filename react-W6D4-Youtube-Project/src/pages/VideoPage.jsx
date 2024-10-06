import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Description from "../components/Description";
import Announcement from "../components/Announcement";

function VideoPage() {
  const navigate = useNavigate();
  const API_KEY = "AIzaSyCNpuSWQeboAJiM_MJXVqAVwVsaJGtm6rI";
  let { categoryId, id } = useParams();
  const URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;
  const commentURL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&videoId=${id}&key=${API_KEY}`;
  const recommendedURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=SA&maxResults=30&videoCategoryId=${categoryId}&key=${API_KEY}`;
  const newUserCommentsURL =
    "https://66e7e6c1b17821a9d9da70a4.mockapi.io/comments";
  const [newUserComment, setNewUserComment] = useState();
  const [info, setInfo] = useState();
  const [channelInfo, setChannelInfo] = useState();
  const [commentsInfo, setCommentsInfo] = useState();
  const [recommendedInfo, setRecommendedInfo] = useState();
  const [comment, setComment] = useState();
  const [isCommented, setIsCommented] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  if (!localStorage.getItem("userId")) {
    navigate("/login");
  }
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
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

  //   const calculateDays = (date) => {
  //     let newDate = new Date(date);
  //     let currDate = new Date();

  //     const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
  //   const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());

  //     let day = obj.getUTCDate();
  //     let month = obj.getUTCMonth() + 1;
  //     let year = obj.getUTCFullYear();
  //     console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);

  //     const oneDay = 24 * 60 * 60 * 1000;
  //     const firstDate = new Date(year, 1, 12);
  //     const secondDate = new Date(2008, 1, 22);

  //     const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  //   };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const getData = () => {
    axios
      .get(URL)
      .then(function (response) {
        console.log(response.data.items[0]);
        setInfo(response.data.items[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNewUserCommentsData = () => {
    axios
      .get(newUserCommentsURL)
      .then(function (response) {
        console.log(response.data);
        setNewUserComment(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getNewUserCommentsData();
  });

  const postNewUserComment = () => {
    setComment("");
    const username = localStorage.getItem("username");
    const date = new Date().toISOString();
    axios
      .post(newUserCommentsURL, {
        username: username,
        comment: comment,
        date: date,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCommentInfo = () => {
    axios
      .get(commentURL)
      .then(function (response) {
        console.log("heeeey----------------------------------");
        console.log(response.data.items);
        setCommentsInfo(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRecommendedInfo = () => {
    axios
      .get(recommendedURL)
      .then(function (response) {
        console.log("recommended here---", response.data.items);
        setRecommendedInfo(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    getCommentInfo();
  }, []);

  useEffect(() => {
    getRecommendedInfo();
  }, []);

  useEffect(() => {
    if (info && info.snippet.channelId) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${info.snippet.channelId}&key=${API_KEY}`
        )
        .then(function (response) {
          console.log("+============================");
          console.log(response.data.items[0]);
          setChannelInfo(response.data.items[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [info]);

  return (
    <>
      <Navbar />
      {info && commentsInfo && newUserComment && recommendedInfo && (
        <div className="flex justify-center items-center w-full h-full  mt-6">
          <div className="w-[88%] h-full flex justify-between max-sm:flex-col  max-sm:w-[97%]">
            {/* right */}
            <div className="w-[62%] h-full flex flex-col justify-evenly gap-2  max-sm:w-full">
              <iframe
                className="w-full h-[30.3vw] rounded-xl max-sm:h-[55vw]"
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              {/* channel desc */}
              <div className="flex flex-col justify-evenly items-start w-full  gap-3">
                <h1 className="font-bold text-black text-xl max-sm:text-[1rem]">
                  {info.snippet.title}
                </h1>
                <div className="flex justify-between w-full">
                  <div className="flex justify-between items-center max-w-[50%] max-sm:gap-2">
                    {/* channel */}
                    {channelInfo && (
                      <div className="flex justify-between items-center gap-2">
                        {/* <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:text-[0.7rem] bg-slate-500"> */}
                        <img
                          className="w-11 h-11 btn-circle max-sm:w-6 max-sm:h-6"
                          src={channelInfo.snippet.thumbnails.default.url}
                        />
                        {/* </div> */}
                        <div className="flex flex-col justify-between">
                          <h3 className="font-bold text-black text-sm max-sm:text-[0.65rem]">
                            {info.snippet.channelTitle}
                          </h3>
                          <h3 className="text-[#646464] text-[0.75rem] max-sm:text-[0.55rem]">
                            {calculateVlaue(
                              channelInfo.statistics.subscriberCount
                            )}{" "}
                            مشترك
                          </h3>
                        </div>
                      </div>
                    )}
                    {/* sub */}
                    <div className="btn btn-circle w-20 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-12 max-sm:h-6 max-sm:min-h-6 max-sm:text-[0.55rem] bg-black text-white">
                      اشتراك
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-[47%]">
                    <div className="join join-horizontal rounded-full">
                      <div className="btn join-item w-28 h-10 min-h-10 pl-0 border-none flex justify-center items-center max-sm:w-12 max-sm:h-6 max-sm:min-h-6 max-sm:text-[0.5rem] max-sm:px-0 bg-slate-200 text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="max-sm:w-3 h-3"
                        >
                          <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                        </svg>
                        <p className="text-black">
                          {calculateVlaue(info.statistics.likeCount)}
                        </p>
                      </div>
                      <div className="btn join-item w-12 h-10 min-h-10 pr-0 border-none flex justify-center items-center max-sm:w-6 max-sm:h-6 max-sm:min-h-6 max-sm:px-0 bg-slate-200 text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="max-sm:w-3 h-3"
                        >
                          <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="btn btn-circle w-24 h-10 min-h-10 gap-1 border-none flex justify-center items-center max-sm:w-12 max-sm:h-6 max-sm:min-h-6 max-sm:text-[0.55rem] bg-slate-200 text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 500 511.79"
                        className="w-5 h-5 max-sm:w-3 max-sm:h-3"
                      >
                        <path d="m206.18 341.56-14.24-93.1c-.81-5.44 2.95-10.54 8.39-11.35l2.4-.06c53.67 3.7 116.61 14.73 169.8 52.27 45.57 32.17 83.63 83.49 101.96 165.7 3.02-15.35 4.76-30.19 5.35-44.5 3.03-73.7-24.57-133.96-65.3-179.92-41.06-46.32-95.43-78.28-145.41-95.07-24.39-8.21-47.67-12.77-67.71-13.59-5.5-.21-9.78-4.85-9.57-10.35l13.69-76.58L25.4 184.07l180.78 157.49zm7.4-83.63 16.43 107.39c.48 2.85-.26 5.89-2.31 8.23-3.62 4.15-9.93 4.59-14.09.97L3.42 191.42l-1.14-1.18c-3.5-4.24-2.9-10.54 1.34-14.05L213.81 2.27c2.2-1.78 5.12-2.65 8.11-2.11 5.41.96 9.02 6.15 8.05 11.55l-16.4 91.11c19.04 1.87 40.11 6.51 61.87 13.82 52.9 17.77 110.47 51.64 154.02 100.77 43.85 49.48 73.57 114.39 70.29 193.89-1.18 29.08-6.83 60.12-17.81 93-1.01 3.87-4.29 6.92-8.49 7.42-5.47.64-10.45-3.28-11.09-8.74-12.27-102.85-52.06-162.58-101.31-197.34-45.5-32.1-99.5-43.39-147.47-47.71z" />
                      </svg>
                      <p className="text-black">مشاركة</p>
                    </div>
                    <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center text-[0.7rem] max-sm:w-6 max-sm:h-6 max-sm:min-h-6 max-sm:text-[0.55rem] bg-slate-200 text-black">
                      &bull; &bull; &bull;
                    </div>
                  </div>
                </div>
              </div>
              {/* details */}
              {/* <div className="bg-[#f2f2f2] w-full h-28 rounded-xl p-3 text-black"> */}
              {/* <p>{info.snippet.description}</p> */}
              {/* </div> */}
              <div className="bg-[#f2f2f2] w-full h-auto rounded-xl p-3 text-black text-[0.8rem] max-sm:text-[0.5rem]">
                <p className="flex-1">
                  {isExpanded || info.snippet.description.length <= 100
                    ? info.snippet.description
                    : `${info.snippet.description.substring(0, 100)}... `}
                  {!isExpanded && info.snippet.description.length > 100 && (
                    <div
                      className=" text-black cursor-pointer"
                      onClick={handleToggle}
                    >
                      المزيد
                    </div>
                  )}
                </p>
                {isExpanded && (
                  <span
                    className=" text-black cursor-pointer"
                    onClick={handleToggle}
                  >
                    عرض محتوى أقل
                  </span>
                )}
              </div>
              <div className="hidden md:flex md:flex-col">
                <div className="flex justify-start items-center w-full">
                  <h1 className="font-bold text-lg text-black max-sm:text-[0.7rem]">
                    {info.statistics.commentCount} تعليقاً
                  </h1>
                  <details className="dropdown">
                    <summary className="btn m-1 bg-transparent border-none shadow-none flex justify-between">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-black max-sm:h-3 max-sm:w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                      <p className="text-black max-sm:text-[0.7rem]">
                        الترتيب حسب
                      </p>
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 max-sm:w-32 max-sm:text-[0.7rem] shadow">
                      <li>
                        <a>أهم التعليقات</a>
                      </li>
                      <li>
                        <a>الأحدث أولاً</a>
                      </li>
                    </ul>
                  </details>
                </div>
                <div className="w-full flex justify-between items-start">
                  <div className="h-full ">
                    <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-6 max-sm:h-6 max-sm:text-[0.7rem] bg-slate-500">
                      {/* <img src={item.snippet.thumbnails.default.url} /> */}
                      @@
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 w-[95%] ">
                    <textarea
                      value={comment}
                      onChange={handleComment}
                      onClick={() => {
                        setIsCommented(true);
                      }}
                      className="w-[95%] h-8  resize-none border-b-[0.1rem] border-b-slate-400 placeholder:text-[#606060] focus:outline-none focus:border-b-2 focus:border-b-black max-sm:h-7 max-sm:text-[0.7rem]"
                      placeholder="إضافة تعليق..."
                    ></textarea>

                    {isCommented && (
                      <div className="flex justify-between items-center gap-2 w-[95%] ">
                        <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-8 max-sm:h-8 max-sm:min-h-8 max-sm:text-[0.7rem] bg-transparent">
                          <svg
                            className="w-7 h-7 text-black max-sm:w-4 max-sm:h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="black"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14.99 9H15M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7 13c0 1 .507 2.397 1.494 3.216a5.5 5.5 0 0 0 7.022 0C16.503 15.397 17 14 17 13c0 0-1.99 1-4.995 1S7 13 7 13Z"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-end items-center gap-2  w-[25%] max-sm:w-[30%]">
                          <div
                            onClick={() => {
                              setIsCommented(false);
                              setComment("");
                            }}
                            className="btn btn-circle w-16 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-10 max-sm:h-8 max-sm:min-h-8 max-sm:text-[0.6rem] bg-transparent text-black"
                          >
                            إلغاء
                          </div>
                          <div
                            onClick={postNewUserComment}
                            className={`btn btn-circle w-16 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-10 max-sm:h-8 max-sm:min-h-8 max-sm:text-[0.6rem] bg-slate-200 text-black ${
                              comment ? "" : " btn-disabled"
                            }`}
                          >
                            تعليق
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {newUserComment.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex justify-between items-start"
                      >
                        <div className="w-full flex justify-between items-start ">
                          <div className="h-full ">
                            <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-6 max-sm:h-6 max-sm:text-[0.7rem] ">
                              <img
                                className="btn-circle w-full h-full"
                                src="{}"
                              />
                              {/* @@ */}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-center gap-2 w-[95%] ">
                            <div className="w-[95%] h-full flex flex-col justify-center items-start gap-1 max-sm:gap-0.5 ">
                              <div className="w-full flex justify-between items-start">
                                <h2 className="font-bold max-sm:text-[0.6rem]">
                                  {item.username}
                                  <span className="pr-2 text-[#606060] text-[0.65rem] max-sm:text-[0.45rem]">
                                    {item.date}
                                  </span>
                                </h2>
                                <details className="dropdown dropdown-left dropdown-bottom">
                                  <summary className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.7rem] bg-transparent shadow-none">
                                    <svg
                                      className="w-6 h-6 text-black max-sm:h-4 max-sm:w-4"
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
                                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] flex justify-center items-center w-28 h-12 px-2 p-0 shadow max-sm:w-20 max-sm:h-8 max-sm:text-[0.5rem]">
                                    <li>
                                      <a className="flex justify-start items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="24"
                                          height="24"
                                          className="max-sm:w-4 max-sm:h-4"
                                        >
                                          <path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path>
                                        </svg>
                                        <p>إبلاغ</p>
                                      </a>
                                    </li>
                                  </ul>
                                </details>
                              </div>
                              <p className="text-black text-[0.9rem] max-sm:text-[0.45rem]">
                                {item.comment}
                              </p>
                              <div className="flex justify-start items-center gap-2">
                                <div className="flex justify-between items-center">
                                  <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      height="24"
                                      className="max-sm:w-3 max-sm:h-3"
                                    >
                                      <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                                    </svg>
                                  </div>
                                  <p className="text-[#606060] text-[0.7rem] max-sm:text-[0.5rem]">
                                    {/* {calculateVlaue(
                                    item.snippet.topLevelComment.snippet
                                      .likeCount
                                  )} */}
                                  </p>
                                </div>
                                <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="max-sm:w-3 max-sm:h-3"
                                  >
                                    <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                                  </svg>
                                </div>
                                <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                  رد
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {commentsInfo.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex justify-between items-start"
                    >
                      <div className="w-full flex justify-between items-start ">
                        <div className="h-full ">
                          <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-6 max-sm:h-6 max-sm:text-[0.7rem] ">
                            <img
                              className="btn-circle w-full h-full"
                              src={
                                item.snippet.topLevelComment.snippet
                                  .authorProfileImageUrl
                              }
                            />
                            {/* @@ */}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 w-[95%] ">
                          <div className="w-[95%] h-full flex flex-col justify-center items-start gap-1 max-sm:gap-0.5 ">
                            <div className="w-full flex justify-between items-start">
                              <h2 className="font-bold max-sm:text-[0.6rem]">
                                {
                                  item.snippet.topLevelComment.snippet
                                    .authorDisplayName
                                }
                                <span className="pr-2 text-[#606060] text-[0.65rem] max-sm:text-[0.45rem]">
                                  منذ يومين
                                </span>
                              </h2>
                              <details className="dropdown dropdown-left dropdown-bottom">
                                <summary className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.7rem] bg-transparent shadow-none">
                                  <svg
                                    className="w-6 h-6 text-black max-sm:h-4 max-sm:w-4"
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
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] flex justify-center items-center w-28 h-12 px-2 p-0 shadow max-sm:w-20 max-sm:h-8 max-sm:text-[0.5rem]">
                                  <li>
                                    <a className="flex justify-start items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="max-sm:w-4 max-sm:h-4"
                                      >
                                        <path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path>
                                      </svg>
                                      <p>إبلاغ</p>
                                    </a>
                                  </li>
                                </ul>
                              </details>
                            </div>
                            <p className="text-black text-[0.9rem] max-sm:text-[0.45rem]">
                              {item.snippet.topLevelComment.snippet.textDisplay}
                            </p>
                            <div className="flex justify-start items-center gap-2">
                              <div className="flex justify-between items-center">
                                <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="max-sm:w-3 max-sm:h-3"
                                  >
                                    <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                                  </svg>
                                </div>
                                <p className="text-[#606060] text-[0.7rem] max-sm:text-[0.5rem]">
                                  {calculateVlaue(
                                    item.snippet.topLevelComment.snippet
                                      .likeCount
                                  )}
                                </p>
                              </div>
                              <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="max-sm:w-3 max-sm:h-3"
                                >
                                  <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                                </svg>
                              </div>
                              <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                رد
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* left */}
            <div className="w-[36%] h-full flex flex-col justify-evenly gap-2  max-sm:w-full">
              <Announcement />
              {recommendedInfo.map((item, index) => {
                return (
                  <div className="w-full h-24 flex justify-between items-start  max-sm:h-[4.5rem]">
                    <Link
                      Link
                      key={index}
                      to={`/video/${item.snippet.categoryId}/${item.id}`}
                      className=" w-[91%] h-full flex justify-between items-center"
                    >
                      <div className="relative w-[42%] h-full  max-sm:w-[39%]">
                        <img
                          className="w-full h-full rounded-xl hover:rounded-none"
                          src={item.snippet.thumbnails.medium.url}
                          alt=""
                        />
                        {/* <div className="absolute bottom-0 left-0 text-white text-[0.8rem] max-sm:text-[0.6rem] font-bold bg-black bg-opacity-50 rounded-lg px-1.5 mb-1 ml-1">
                          12:33
                        </div> */}
                      </div>
                      <div className="w-[56%] h-full flex flex-col justify-start items-start gap-1 max-sm:w-[59%] pr-1 ">
                        <div className="w-full flex justify-between items-center">
                          <h2 className="font-bold text-black text-[0.75rem] max-sm:text-[0.6rem]">
                            {item.snippet.title.length > 60
                              ? `${item.snippet.title.substring(0, 60)}... `
                              : item.snippet.title}
                          </h2>
                        </div>
                        <p className="text-[#92999f] text-[0.65rem] max-sm:text-[0.46rem]">
                          {item.snippet.channelTitle}
                        </p>
                        <p className="text-[#92999f] text-[0.65rem] max-sm:text-[0.46rem]">
                          {calculateVlaue(item.statistics.viewCount)} مشاهدة
                          &bull; {item.snippet.publishedAt}
                        </p>
                      </div>
                    </Link>
                    <div className=" w-[9%]">
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
            <div className="flex flex-col w-full max-sm:order-3 md:hidden">
              <div className="flex justify-start items-center w-full">
                <h1 className="font-bold text-lg text-black max-sm:text-[0.7rem]">
                  {info.statistics.commentCount} تعليقاً
                </h1>
                <details className="dropdown">
                  <summary className="btn m-1 bg-transparent border-none shadow-none flex justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-black max-sm:h-3 max-sm:w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    <p className="text-black max-sm:text-[0.7rem]">
                      الترتيب حسب
                    </p>
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 max-sm:w-32 max-sm:text-[0.7rem] shadow">
                    <li>
                      <a>أهم التعليقات</a>
                    </li>
                    <li>
                      <a>الأحدث أولاً</a>
                    </li>
                  </ul>
                </details>
              </div>
              <div className="w-full flex justify-between items-start">
                <div className="h-full ">
                  <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-6 max-sm:h-6 max-sm:text-[0.7rem] bg-slate-500">
                    {/* <img src={item.snippet.thumbnails.default.url} /> */}
                    @@
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 w-[95%] ">
                  <textarea
                    value={comment}
                    onChange={handleComment}
                    onClick={() => {
                      setIsCommented(true);
                    }}
                    className="w-[95%] h-8  resize-none border-b-[0.1rem] border-b-slate-400 placeholder:text-[#606060] focus:outline-none focus:border-b-2 focus:border-b-black max-sm:h-7 max-sm:text-[0.7rem]"
                    placeholder="إضافة تعليق..."
                  ></textarea>

                  {isCommented && (
                    <div className="flex justify-between items-center gap-2 w-[95%] ">
                      <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-8 max-sm:h-8 max-sm:min-h-8 max-sm:text-[0.7rem] bg-transparent">
                        <svg
                          className="w-7 h-7 text-black max-sm:w-4 max-sm:h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.99 9H15M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7 13c0 1 .507 2.397 1.494 3.216a5.5 5.5 0 0 0 7.022 0C16.503 15.397 17 14 17 13c0 0-1.99 1-4.995 1S7 13 7 13Z"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-end items-center gap-2 w-[25%] max-sm:w-[30%]">
                        <div
                          onClick={() => {
                            setIsCommented(false);
                            setComment("");
                          }}
                          className="btn btn-circle w-16 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-10 max-sm:h-8 max-sm:min-h-8 max-sm:text-[0.6rem] bg-transparent text-black"
                        >
                          إلغاء
                        </div>
                        <div
                          className={`btn btn-circle w-16 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-10 max-sm:h-8 max-sm:min-h-8 max-sm:text-[0.6rem] bg-slate-200 text-black ${
                            comment ? "" : " btn-disabled"
                          }`}
                        >
                          تعليق
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {newUserComment.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex justify-between items-start"
                    >
                      <div className="w-full flex justify-between items-start ">
                        <div className="h-full ">
                          <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-6 max-sm:h-6 max-sm:text-[0.7rem] bg-slate-500">
                            <img
                              className="btn-circle w-full h-full"
                              src="{}"
                            />
                            {/* @@ */}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 w-[95%] ">
                          <div className="w-[95%] h-full flex flex-col justify-center items-start gap-1 max-sm:gap-0.5 ">
                            <div className="w-full flex justify-between items-start">
                              <h2 className="font-bold max-sm:text-[0.6rem]">
                                {item.username}
                                <span className="pr-2 text-[#606060] text-[0.65rem] max-sm:text-[0.45rem]">
                                  {item.date}
                                </span>
                              </h2>
                              <details className="dropdown dropdown-left dropdown-bottom">
                                <summary className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.7rem] bg-transparent shadow-none">
                                  <svg
                                    className="w-6 h-6 text-black max-sm:h-4 max-sm:w-4"
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
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] flex justify-center items-center w-28 h-12 px-2 p-0 shadow max-sm:w-20 max-sm:h-8 max-sm:text-[0.5rem]">
                                  <li>
                                    <a className="flex justify-start items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="max-sm:w-4 max-sm:h-4"
                                      >
                                        <path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path>
                                      </svg>
                                      <p>إبلاغ</p>
                                    </a>
                                  </li>
                                </ul>
                              </details>
                            </div>
                            <p className="text-black text-[0.9rem] max-sm:text-[0.45rem]">
                              {item.comment}
                            </p>
                            <div className="flex justify-start items-center gap-2">
                              <div className="flex justify-between items-center">
                                <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="max-sm:w-3 max-sm:h-3"
                                  >
                                    <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                                  </svg>
                                </div>
                                <p className="text-[#606060] text-[0.7rem] max-sm:text-[0.5rem]">
                                  {/* {calculateVlaue(
                                    item.snippet.topLevelComment.snippet
                                      .likeCount
                                  )} */}
                                </p>
                              </div>
                              <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="max-sm:w-3 max-sm:h-3"
                                >
                                  <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                                </svg>
                              </div>
                              <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                رد
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {commentsInfo.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex justify-between items-start"
                  >
                    <div className="w-full flex justify-between items-start ">
                      <div className="h-full ">
                        <div className="btn-circle w-11 h-11 flex justify-center items-center max-sm:w-6 max-sm:h-6 max-sm:text-[0.7rem] ">
                          <img
                            className="btn-circle w-full h-full"
                            src={
                              item.snippet.topLevelComment.snippet
                                .authorProfileImageUrl
                            }
                          />
                          {/* @@ */}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 w-[95%] ">
                        <div className="w-[95%] h-full flex flex-col justify-center items-start gap-1 max-sm:gap-0.5 ">
                          <div className="w-full flex justify-between items-start">
                            <h2 className="font-bold max-sm:text-[0.6rem]">
                              {
                                item.snippet.topLevelComment.snippet
                                  .authorDisplayName
                              }
                              <span className="pr-2 text-[#606060] text-[0.65rem] max-sm:text-[0.45rem]">
                                منذ يومين
                              </span>
                            </h2>
                            <details className="dropdown dropdown-left dropdown-bottom">
                              <summary className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.7rem] bg-transparent shadow-none">
                                <svg
                                  className="w-6 h-6 text-black max-sm:h-4 max-sm:w-4"
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
                              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] flex justify-center items-center w-28 h-12 px-2 p-0 shadow max-sm:w-20 max-sm:h-8 max-sm:text-[0.5rem]">
                                <li>
                                  <a className="flex justify-start items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      height="24"
                                      className="max-sm:w-4 max-sm:h-4"
                                    >
                                      <path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path>
                                    </svg>
                                    <p>إبلاغ</p>
                                  </a>
                                </li>
                              </ul>
                            </details>
                          </div>
                          <p className="text-black text-[0.9rem] max-sm:text-[0.45rem]">
                            {item.snippet.topLevelComment.snippet.textDisplay}
                          </p>
                          <div className="flex justify-start items-center gap-2">
                            <div className="flex justify-between items-center">
                              <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="max-sm:w-3 max-sm:h-3"
                                >
                                  <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                                </svg>
                              </div>
                              <p className="text-[#606060] text-[0.7rem] max-sm:text-[0.5rem]">
                                {calculateVlaue(
                                  item.snippet.topLevelComment.snippet.likeCount
                                )}
                              </p>
                            </div>
                            <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="max-sm:w-3 max-sm:h-3"
                              >
                                <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                              </svg>
                            </div>
                            <div className="btn btn-circle w-10 h-10 min-h-10 border-none flex justify-center items-center max-sm:w-5 max-sm:h-5 max-sm:min-h-5 max-sm:text-[0.5rem] bg-transparent shadow-none">
                              رد
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoPage;
