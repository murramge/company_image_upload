import React, { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConsumerMain = memo(({ Onbizinfo, infolist }) => {
  const [bizinfo, setbizinfo] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    Onbizinfo(id);
  }, []);

  useEffect(() => {
    setbizinfo(infolist);
  }, [infolist]);

  const [bizinfodata, setbizinfodata] = useState([]);
  const [expireddate, setexpireddate] = useState();

  const bizInfo = Array(bizinfo).reduce((dt, item) => {
    dt = dt.concat(item);
    return dt;
  }, []);

  const bizinfo_uuid = String(bizinfo.uuid);
  const bizinfo_company = String(bizinfo.company_name);
  useEffect(() => {
    bizInfo.map((item) => {
      if (bizinfo_uuid == id) {
        setbizinfodata([
          {
            name: "업체명",
            item: item.company_name,
          },
          { name: "대표번호", item: item.main_phonenumber },
          { name: "주 소", item: item.biz_addr },
          { name: "업 종", item: item.categorys },
        ]);

        setexpireddate(item.expired_date);
      }
    });
  }, [bizinfo]);

  const navigate = useNavigate();
  const ImageUpdate = () => {
    navigate(`/upload/${id}`);
  };

  const UpdateConfirm = () => {
    navigate(`/confirm/${id}`);
  };

  return (
    <div className="bg-[url(bg.png)] bg-cover grid grid-flow-row auto-rows-fr place-items-center min-h-screen">
      <div>
        <div className="w-screen flex justify-center">
          <img
            src="head1m.png"
            className="w-2/3 sm:w-2/4 md:w-5/12 lg:w-2/6 xl:w-1/4"
          ></img>
        </div>
        <p className=" text-[15px] sm:text-[16px] xl:text-[18px] text-center pt-5 text-white font-light">
          <span>현 페이지는 </span>
          <span className="text-red-300 font-bold">{bizinfo_company}</span>
          <span> 사업장 전용 페이지입니다.</span>
        </p>
      </div>
      <div className="w-full flex justify-center pb-10">
        <div className="bg-white rounded-3xl shadow-xl h-max pb-6 w-11/12 sm:w-4/5 md:w-3/6 xl:w-2/4 xl:h-4/5 2xl:w-2/5">
          <div className="flex justify-center items-center pt-5 xl:pt-8 w-full">
            <div className="ml-4">
              {bizinfodata.map((item, key) => {
                return (
                  <div key={key}>
                    <div key={key} className="flex text-[16px]">
                      <div className="w-[25%] p-1">
                        <span className="font-bold">{item.name}</span>
                      </div>
                      <div className="w-[75%]">
                        <span>{item.item}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/5 sm:w-2/4	md:w-2/5 lg:w-4/12 xl:w-3/12 2xl:w-1/5">
        <div className="justify-center ">
          <button
            className="bg-neutral-500 text-white p-3 text-center rounded-xl w-full mx-auto
            hover:bg-neutral-700 hover:text-white
            active:bg-neutral-500
            focus:bg-neutral-700
            "
            onClick={ImageUpdate}
          >
            업로드 하기
          </button>
        </div>
        <div className="justify-center">
          <button
            className="bg-neutral-500 text-white p-3 text-center rounded-xl w-full mx-auto mt-5
            hover:bg-neutral-700 hover:text-white
            active:bg-neutral-500
            focus:bg-neutral-700
            "
            onClick={UpdateConfirm}
          >
            등록 내역 확인
          </button>
        </div>
      </div>
      <div className="text-center pb-28">
        <p className="text-center text-sm">
          해당 페이지는 {expireddate} 까지 <br></br>접속이 가능합니다.
        </p>
      </div>
    </div>
  );
});

export default ConsumerMain;
