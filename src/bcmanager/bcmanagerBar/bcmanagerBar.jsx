import React from "react";
import { Link } from "react-router-dom";

const BcmanagerBar = ({ switchs }) => {
  return (
    <div className="max-h-screen  ">
      <div className=" h-screen border-r-2 border-slate-300 bg-slate-200">
        <div className="py-px">
          <div
            className={
              switchs == "main"
                ? "w-full bg-gradient-to-t from-sky-700 to-sky-600 text-white p-1 break-all shadow-sm  border-2 border-sky-700 font-bold"
                : "w-full bg-gradient-to-t from-slate-100 to-slate-50 p-1 shadow-sm border-2 border-slate-300  text-left "
            }
          >
            <Link to="/manager" className="text-lg text-center block p-5 ">
              업로드 목록
            </Link>
          </div>
          <div
            className={
              switchs == "search"
                ? "w-full bg-gradient-to-t from-sky-700 to-sky-600 text-white p-1 break-all shadow-sm  border-2 border-sky-700 font-bold"
                : "w-full bg-gradient-to-t from-slate-100 to-slate-50 p-1 shadow-sm border-2 border-slate-300 mb- text-left "
            }
          >
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
