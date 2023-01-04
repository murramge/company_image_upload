import React from "react";
import { Link } from "react-router-dom";

const BcmanagerBar = (props) => {
  return (
    <div className="max-h-screen  ">
      <div className=" h-screen border-r-2 border-slate-300 bg-slate-200">
        <div className="">
          <div className="h-16 bg-slate-50 border mb-px">
            <Link to="/manager" className="text-lg text-center block p-5 ">
              메인 화면
            </Link>
          </div>
          <div className="h-16 bg-slate-50  mb-px ">
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
