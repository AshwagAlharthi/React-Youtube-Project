import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginNavbar from "../components/loginNavbar";

function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginData, setLoginData] = useState();
  const [alertmsg, setAlertmsg] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("userId")) {
    localStorage.removeItem("userId");
  }

  const getLoginData = () => {
    axios
      .get("https://66e7e6c1b17821a9d9da70a4.mockapi.io/login")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setLoginData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getLoginData();
  }, []);

  const postNewUser = () => {
    axios
      .post("https://66e7e6c1b17821a9d9da70a4.mockapi.io/login", {
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const newRegister = (e) => {
    const isExistUser = loginData.some(
      (user) => user.username == usernameValue
    );
    if (isExistUser) {
      setAlertmsg("* المستخدم موجود بالفعل!");
      return;
    } else {
      if (emailValue !== "" && usernameValue !== "" && passwordValue !== "") {
        postNewUser();
        navigate("/login");
        setEmailValue("");
        setUsernameValue("");
        setPasswordValue("");
        setAlertmsg("");
      } else {
        setAlertmsg("* الرجاء تعبئة الحقول!");
      }
    }
  };

  const loginPage = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-center items-start w-full h-screen gap-10">
      <LoginNavbar />
      <div className="flex justify-center items-start w-full h-[95%]">
        <div className="w-[35%] h-[95%] rounded-xl bg-gray-100 flex justify-evenly items-center max-sm:w-[90%] max-sm:h-[85%]">
          <div className="w-[90%] h-full flex flex-col justify-evenly items-center">
            <h1 className="text-2xl font-bold ">إنشاء حساب جديد</h1>
            <div className="card bg-base-100 w-[90%] shrink-0 shadow-2xl">
              <div className="card-body py-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">البريد الالكتروني</span>
                  </label>
                  <input
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    type="email"
                    placeholder="البريد الالكتروني"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">اسم المستخدم</span>
                  </label>
                  <input
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                    type="text"
                    placeholder="اسم المستخدم"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">كلمة المرور</span>
                  </label>
                  <input
                    value={passwordValue}
                    onChange={(e) => {
                      setPasswordValue(e.target.value);
                    }}
                    type="password"
                    placeholder="كلمة المرور"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={newRegister}
                    className="btn bg-[#212121] text-white hover:text-black hover:bg-slate-300"
                  >
                    تسجيل الدخول
                  </button>
                </div>
                <label className="text-[0.8rem] w-full flex justify-center items-center">
                  لديك حساب بالفعل؟
                  <span>
                    <p
                      onClick={loginPage}
                      className="pr-2 label-text-alt link link-hover text-[#ff0000]"
                    >
                      تسجيل الدخول
                    </p>
                  </span>
                </label>
                {alertmsg && (
                  <p className="text-center text-[#ff0000] font-bold text-sm">
                    {alertmsg}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
