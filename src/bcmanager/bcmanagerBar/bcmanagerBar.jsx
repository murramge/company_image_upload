import React from "react";
import { Link } from "react-router-dom";

const BcmanagerBar = (props) => {
  return (
    <div className="max-h-screen ">
      <div className="w-56 h-screen border-r bg-slate-200">
        <div className="">
          <div className="w-full h-16 bg-slate-100 border mb-px">
            <Link to="/manager" className="text-lg block p-5 ">
              메인 화면
            </Link>
          </div>
          <div className="w-full h-16 bg-slate-100  mb-px ">
            <Link to="/manager/search" className="text-lg block p-5">
              업체 검색
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BcmanagerBar;
