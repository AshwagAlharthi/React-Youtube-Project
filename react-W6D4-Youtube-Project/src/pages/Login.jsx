import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "../components/loginNavbar";

function Login() {
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginData, setLoginData] = useState();
  const [alertmsg, setAlertmsg] = useState("");

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

  const login = () => {
    if (usernameValue != "" && passwordValue != "") {
      const isExistUser = loginData.find(
        (user) =>
          user.username == usernameValue && user.password == passwordValue
      );

      if (isExistUser) {
        navigate("/");
        localStorage.setItem("userId", isExistUser.id);
        localStorage.setItem("username", isExistUser.username);
        setUsernameValue("");
        setPasswordValue("");
        setAlertmsg("");
      } else {
        setAlertmsg("* الرجاء إدخال بيانات صحيحة!");
      }
    } else {
      setAlertmsg("* الرجاء تعبئة الحقول!");
    }
  };

  const register = () => {
    navigate("/register");
  };
  return (
    // <>
      <div className="flex flex-col justify-center items-start w-full h-screen gap-10">
        <LoginNavbar />
      <div className="flex justify-center items-start w-full h-[95%]">
        <div className="w-[35%] h-[90%] rounded-xl bg-gray-100 flex justify-evenly items-center max-sm:w-[90%] max-sm:h-[75%]">
          <div className="w-[90%] h-full flex flex-col justify-evenly items-center">
            <h1 className="text-2xl font-bold ">تسجيل الدخول</h1>
            <div className="card bg-base-100 w-[90%] shrink-0 shadow-2xl">
              <div className="card-body">
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
                    onChange={(e) => setPasswordValue(e.target.value)}
                    type="password"
                    placeholder="كلمة المرور"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={login}
                    className="btn bg-[#212121] text-white hover:text-black hover:bg-slate-300"
                  >
                    تسجيل الدخول
                  </button>
                </div>
                <label className="text-[0.8rem] w-full flex justify-center items-center">
                  ليس لديك حساب؟
                  <span>
                    <p
                      onClick={register}
                      className="pr-2 label-text-alt link link-hover text-[#ff0000]"
                    >
                      إنشاء حساب جديد
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

export default Login;
