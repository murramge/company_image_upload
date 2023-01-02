import React from "react";
import BcmanagerInfoBar from "../bcmanagerBar/bcmanagerInfoBar";
import BcmanagerHeader from "../bcmanagerHeader/bcmanagerHeader";
import BcRecentRequestList from "../bcmanagerList/bcRecentRequestList";
import BcRecentUploadList from "../bcmanagerList/bcRecentUploadList";

function BcmanagerView(props) {
  return (
    <>
      <div className="flex">
        <div>
          <div>
            <BcmanagerHeader></BcmanagerHeader>
          </div>
          <div>
            <BcmanagerInfoBar />
          </div>
        </div>
        <div className="w-full">
          <div className="h-14 bg-sky-700"> </div>
          <div className="h-8 bg-slate-700 text-white px-2 pt-1">
            업체 상세페이지
          </div>
        </div>
      </div>
    </>
  );
}

export default BcmanagerView;
