import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

function BcmanagerLogin(props) {
  const [password, setPassword] = useState("");
  const [idChecked, setidChecked] = useState(false);

  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate(`/manager`);
    }
  }, []);

  useEffect(() => {
    if (idChecked) {
      idRef.current.value = localStorage.getItem("rememberid");
    }
  }, [idChecked]);

  const users = [
    { email: "kim@test.com", password: "123", name: "김진주" },
    { email: "lee@test.com", password: "456", name: "이민지" },
    { email: "park@test.com", password: "789", name: "박수희" },
  ];

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === idRef.current.value && user.password === password
    );
    if (idChecked) {
      localStorage.setItem("rememberid", idRef.current.value);
    }
    if (user) {
      localStorage.setItem("id", user.email);
      localStorage.setItem("password", user.password);
      localStorage.setItem("name", user.name);
      navigate(`/manager`);
    } else {
      alert("로그인 실패 다시 확인해주세요.");
      if (!localStorage.getItem("rememberid")) {
        localStorage.removeItem("rememberid");
        idRef.current.value = null;
      }
      pwRef.current.value = null;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("rememberid") !== null) {
      setidChecked(true);
    }
  }, []);

  const handleOnchange = (e) => {
    setidChecked(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("rememberid", idRef.current.value);
    } else {
      localStorage.removeItem("rememberid");
    }
  };

  return (
    <>
      <div className="bg-slate-200 bg-cover  w-screen h-screen flex">
        <div className="w-[50%] h-[60%] m-auto bg-slate-100 shadow-md border border-2 ">
          <div className="w-full flex">
            <div className="h-14 w-64 bg-sky-800 text-[24px] text-white px-4 py-1 ">
              ADMIN LOGIN
            </div>
            <div className="h-14 w-full bg-sky-700">
              <p className="p-3 text-white">
                업체 이미지 / 영업 문구 등록 관리
              </p>
            </div>
          </div>
          <div className="grid grid-row-3 gap-4 place-items-center p-20">
            <div className="w-[80%] py-3">
              <input
                type="text"
                ref={idRef}
                placeholder="사용자 아이디"
                className="w-full border border-slate-300 border-2  p-2"
              ></input>
            </div>
            <div className="w-[80%]">
              <input
                type="password"
                placeholder="암호"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 border-2  p-2"
                ref={pwRef}
              ></input>
            </div>
            <div className="w-full px-20 py-2 flex justify-start">
              <input
                type="checkbox"
                className="w-[20px] h-[20px]"
                onChange={handleOnchange}
                checked={idChecked}
              />
              <span className="px-2 ">아이디 저장</span>
            </div>
            <div className="p-5">
              <button
                className="border border-slate-500 w-20 mx-2 bg-blue-500 text-white p-2"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BcmanagerLogin;
