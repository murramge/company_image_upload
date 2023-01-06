import React from "react";
import { Link } from "react-router-dom";

const BcmanagerBar = (props) => {
  return (
    <div className="max-h-screen  ">
      <div className=" h-screen border-r-2 border-slate-300 bg-slate-200">
        <div className="">
          <div className="w-full bg-gradient-to-t from-slate-200 to-slate-100 p-1 shadow-sm border-2 border-slate-300 mb- text-left ">
            <Link to="/manager" className="text-lg text-center block p-5 ">
              메인 화면
            </Link>
          </div>
          <div className="w-full bg-gradient-to-t from-slate-200 to-slate-100 p-1 shadow-sm border-2 border-slate-300 mb- text-left  ">
            <Link
              to="/manager/search"
              className="text-lg text-center  block p-5"
            >
              업체 검색
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BcmanagerBar;
