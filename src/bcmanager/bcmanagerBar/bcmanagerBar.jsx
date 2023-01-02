import React from "react";
import { Link } from "react-router-dom";

const BcmanagerBar = (props) => {
  return (
    <div className="max-h-screen">
      <div className="w-56 h-screen border-r">
        <div className="py-10">
          <div className="w-full h-16 bg-white  rounded-lg shadow-md	mb-2 text-center">
            <Link to="/manager" className="text-lg block p-5">
              메인 화면
            </Link>
          </div>
          <div className="w-full h-16 bg-white rounded-lg shadow-md	mb-2 text-center">
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
