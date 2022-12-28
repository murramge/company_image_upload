import React from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";
import BcmanagerList from "../bcmanagerList/bcmanagerList";

const BcmanagerMain = ({ OnRecentRequest }) => {
  return (
    <div>
      <>
        <div className="flex">
          <BcmanagerBar />
          <div className="w-full bg-red-200">
            <BcmanagerList onRecentRequest={OnRecentRequest} />
          </div>
        </div>
      </>
    </div>
  );
};

export default BcmanagerMain;
