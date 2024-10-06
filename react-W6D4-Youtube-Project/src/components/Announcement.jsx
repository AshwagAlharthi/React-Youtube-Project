import React from "react";
import Navbar from "./Navbar";

function Announcement() {
  return (
    <div>
      <div className=" h-28 rounded-xl border-[0.1rem] flex flex-col">
        <div className="w-full h-[50%] rounded-t-xl flex justify-center items-center ">
          <img className="w-[40%] h-full" src="https://i.pcmag.com/imagery/reviews/06bnqFCCqMYNmhahHfpuUFs-13.fit_lim.size_1050x591.v1620226809.png"/>
        </div>

        <div className="w-full h-[50%] rounded-b-xl  flex justify-evenly items-center">
          {/* <div className="bg-yellow-200 w-[60%] h-full flex justify-center items-center"> */}
            {/* <img className="w-6 h-6 btn-circle bg-slate-700" src="" /> */}
            <div className="w-[85%] h-full flex flex-col justify-center items-start pr-2">
              <h1 className="text-sm font-semibold">Get Started</h1>
              <p className="text-[0.65rem] font-bold">
                إعلان &bull; 
                <span className="pr-1 font-normal text-gray-500">
                coursera.org/
                </span>
              </p>
            </div>
            <div className="w-[40%] h-full flex justify-center items-center">
              <a href="https://www.coursera.org/" target="_blank"><div className="btn btn-circle w-12 h-8 min-h-8 border-none flex justify-center items-center max-sm:w-12 max-sm:h-6 max-sm:min-h-6 max-sm:text-[0.65rem] bg-black text-white">
                انتقال
              </div></a>
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
                <ul className="menu dropdown-content bg-base-100 min-h-full w-60 px-0 rounded-xl text-[0.78rem] text-black z-10 max-sm:w-40 max-sm:px-0 ">
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M21 16h-7v-1h7v1zm0-5H9v1h12v-1zm0-4H3v1h18V7zm-11 8-7-4v8l7-4z"></path>
                      </svg>
                      <p>الإضافة إلى قائمةالمحتوى التالي</p>
                    </a>
                  </li>
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path>
                      </svg>
                      <p>الحفظ في قائمة "المشاهدة لاحقاً"</p>
                    </a>
                  </li>
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path>
                      </svg>
                      <p>حفظ في قائمة تشغيل</p>
                    </a>
                  </li>
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
                      </svg>
                      <p>تنزيل</p>
                    </a>
                  </li>
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 500 511.79"
                        className="w-5 h-5"
                      >
                        <path d="m206.18 341.56-14.24-93.1c-.81-5.44 2.95-10.54 8.39-11.35l2.4-.06c53.67 3.7 116.61 14.73 169.8 52.27 45.57 32.17 83.63 83.49 101.96 165.7 3.02-15.35 4.76-30.19 5.35-44.5 3.03-73.7-24.57-133.96-65.3-179.92-41.06-46.32-95.43-78.28-145.41-95.07-24.39-8.21-47.67-12.77-67.71-13.59-5.5-.21-9.78-4.85-9.57-10.35l13.69-76.58L25.4 184.07l180.78 157.49zm7.4-83.63 16.43 107.39c.48 2.85-.26 5.89-2.31 8.23-3.62 4.15-9.93 4.59-14.09.97L3.42 191.42l-1.14-1.18c-3.5-4.24-2.9-10.54 1.34-14.05L213.81 2.27c2.2-1.78 5.12-2.65 8.11-2.11 5.41.96 9.02 6.15 8.05 11.55l-16.4 91.11c19.04 1.87 40.11 6.51 61.87 13.82 52.9 17.77 110.47 51.64 154.02 100.77 43.85 49.48 73.57 114.39 70.29 193.89-1.18 29.08-6.83 60.12-17.81 93-1.01 3.87-4.29 6.92-8.49 7.42-5.47.64-10.45-3.28-11.09-8.74-12.27-102.85-52.06-162.58-101.31-197.34-45.5-32.1-99.5-43.39-147.47-47.71z" />
                      </svg>
                      <p>مشاركة</p>
                    </a>
                  </li>
                  <div className="divider m-0"></div>
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM3 12c0 2.31.87 4.41 2.29 6L18 5.29C16.41 3.87 14.31 3 12 3c-4.97 0-9 4.03-9 9zm15.71-6L6 18.71C7.59 20.13 9.69 21 12 21c4.97 0 9-4.03 9-9 0-2.31-.87-4.41-2.29-6z"></path>
                      </svg>
                      <p>لايهمني</p>
                    </a>
                  </li>
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <g>
                          <path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z"></path>
                        </g>
                      </svg>
                      <p>عدم اقتراح القناة</p>
                    </a>
                  </li>
                  <li>
                    <a className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path>
                      </svg>
                      <p>إبلاغ</p>
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
