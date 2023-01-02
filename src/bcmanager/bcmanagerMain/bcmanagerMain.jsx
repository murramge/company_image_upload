import React from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";
import BcRecentRequestList from "../bcmanagerList/bcRecentRequestList";
import BcRecentUploadList from "../bcmanagerList/bcRecentUploadList";
import BcmanagerHeader from "../bcmanagerHeader/bcmanagerHeader";

const BcmanagerMain = ({ recentRequestList, recentUploadList }) => {
  return (
    <>
      <div className="flex">
        <div>
          <div>
            <BcmanagerHeader></BcmanagerHeader>
          </div>
          <div>
            <BcmanagerBar />
          </div>
        </div>
        <div className="w-full">
          <div className="h-16 bg-sky-700"> </div>
          <div className="h-8 bg-slate-700">ddd</div>
          <p className="text-[20px] my-3 py-2 bg-blue-500 text-white w-max px-3 rounded-md">
            1. 최근 요청 전송 리스트
          </p>
          <BcRecentRequestList recentRequestList={recentRequestList} />

          <p className="text-[20px] my-3 py-2 bg-blue-500 text-white w-max px-3 rounded-md">
            2. 최근 업로드 된 업체 리스트
          </p>
          <BcRecentUploadList recentUploadList={recentUploadList} />
        </div>
      </div>
    </>
  );
};

export default BcmanagerMain;
