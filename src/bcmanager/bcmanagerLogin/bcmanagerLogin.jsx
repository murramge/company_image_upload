import React, { useState } from "react";

function BcmanagerLogin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  console.log(id, password);

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
                placeholder="사용자 아이디"
                onChange={(e) => setId(e.target.value)}
                className="w-full border border-slate-300 border-2  p-2"
              ></input>
            </div>
            <div className="w-[80%]">
              <input
                type="password"
                placeholder="암호"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 border-2  p-2"
              ></input>
            </div>
            <div className="w-full px-20 py-2 flex justify-start">
              <input type="checkbox" className="w-[20px] h-[20px]  " />
              <span className="px-2 ">아이디 저장</span>
            </div>
            <div className="p-5">
              <button className="border border-slate-500 w-20 mx-2 bg-blue-500 text-white p-2">
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
