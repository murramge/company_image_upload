import React from "react";

function BcmanagerHeader(props) {
  const date = new Date();
  const today = date.toLocaleDateString("ko-kr");
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfweek = week[date.getDay()];

  return (
    <>
      <div className="h-14 w-full bg-sky-800 text-white text-[26px] p-1 ">
        ADMIN
      </div>
      <div className="h-8 w-full bg-slate-900 text-white p-1">
        {today} {dayOfweek}요일
      </div>
    </>
  );
}

export default BcmanagerHeader;