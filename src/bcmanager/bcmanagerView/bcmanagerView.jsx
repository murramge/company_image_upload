import React from "react";
import { useParams } from "react-router-dom";
import BcmanagerInfoBar from "../bcmanagerBar/bcmanagerInfoBar";
import BcmanagerHeader from "../bcmanagerHeader/bcmanagerHeader";

function BcmanagerView({ recentRequestList }) {
  const { id } = useParams();
  const data = recentRequestList.filter((item) => item.uuid == id);

  return (
    <>
      <div className="flex">
        <div>
          <div>
            <BcmanagerHeader></BcmanagerHeader>
          </div>
          <div>
            <BcmanagerInfoBar
              companyData={data}
              companyAll={recentRequestList}
            />
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
