import React from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";
import BcRecentRequestList from "../bcmanagerList/bcRecentRequestList";
import BcRecentUploadList from "../bcmanagerList/bcRecentUploadList";

const BcmanagerMain = ({ recentRequestList, recentUploadList }) => {
  return (
    <div>
      <>
        <div className="flex">
          <BcmanagerBar />
          <div className="w-full bg-red-200">
            <p>1. 최근 요청 전송 리스트</p>
            <BcRecentRequestList recentRequestList={recentRequestList} />
            <p>2. 최근 업로드 된 업체 리스트</p>
            <BcRecentUploadList recentUploadList={recentUploadList} />
          </div>
        </div>
      </>
    </div>
  );
};

export default BcmanagerMain;
