import React from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";
import BcRecentRequestList from "../bcmanagerList/bcRecentRequestList";
import BcRecentUploadList from "../bcmanagerList/bcRecentUploadList";
import BcmanagerHeader from "../bcmanagerHeader/bcmanagerHeader";

const BcmanagerMain = ({ recentRequestList, recentUploadList }) => {
  console.log(recentRequestList);
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
        <div className="w-full bg-slate-200">
          <div className="h-14 bg-sky-700"> </div>
          <div className="h-8 bg-slate-700 text-white px-2 pt-1">메인 화면</div>
          <p className="text-[18px] py-3 bg-slate-200 shadow-sm border-y border-slate-400  px-5 font-bold  ">
            최근 요청 전송 리스트
          </p>
          {recentRequestList && (
            <BcRecentRequestList recentRequestList={recentRequestList} />
          )}
          {recentRequestList.length === 0 && (
            <div className="text-center p-10">리스트가 존재하지 않습니다.</div>
          )}
          <p className="text-[18px] py-3 bg-slate-200 border-y border-slate-400 shadow-sm px-5 font-bold ">
            최근 업로드 된 업체 리스트
          </p>
          {recentUploadList && (
            <BcRecentUploadList recentUploadList={recentUploadList} />
          )}
          {recentUploadList.length === 0 && (
            <div className="text-center p-10">리스트가 존재하지 않습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default BcmanagerMain;
