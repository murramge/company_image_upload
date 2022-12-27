import React from "react";
import { Link } from "react-router-dom";

const BcmanagerBar = (props) => {
  return (
    <div className="max-h-screen">
      <div className=" bg-slate-200  w-56 h-screen">
        <div>
          <Link to="/manager/12">메인 화면</Link>
        </div>
        <div>
          <Link to="/manager/search/12">업체 검색</Link>
        </div>
      </div>
    </div>
  );
};

export default BcmanagerBar;
