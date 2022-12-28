import React from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";
import BcmanagerList from "../bcmanagerList/bcmanagerList";
import BcmanagerSearchBar from "./bcmanagerSearchBar";
const BcmanagerSearch = (props) => {
  return (
    <>
      <div className="flex">
        <BcmanagerBar />
        <div className="w-full bg-red-200">
          <div>
            <p className="text-center">업체 검색</p>
          </div>
          <BcmanagerSearchBar />
        </div>
      </div>
    </>
  );
};

export default BcmanagerSearch;
