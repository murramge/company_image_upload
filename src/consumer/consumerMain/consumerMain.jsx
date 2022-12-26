import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ConsumerMain(props) {
  const [bizinfo, setbizinfo] = useState([]);
  const [errorcode, seterrorcode] = useState();
  const { id } = useParams();
  const config = {
    method: "get",
    url: `/api/bizContent/info/${id}`,
    headers: {},
  };

  useEffect(() => {
    axios(config)
      .then((response) => response.data)
      .then((item) => `${setbizinfo(item.data)} ${seterrorcode(item.code)}`)
      .catch((error) => console.log(error));
  }, []);

  const [bizinfodata, setbizinfodata] = useState([]);
  const [expireddate, setexpireddate] = useState();

  const bizInfo = Array(bizinfo).reduce((dt, item) => {
    dt = dt.concat(item);
    return dt;
  }, []);

  const bizinfo_uuid = String(bizinfo.uuid);

  useEffect(() => {
    bizInfo.map((item) => {
      if (bizinfo_uuid == id) {
        setbizinfodata([
          item.company_name,
          item.main_phonenumber,
          item.biz_addr,
          item.categorys,
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
    <div className="bg-slate-300  grid grid-flow-row auto-rows-fr place-items-center min-h-screen">
      <div className="bg-white rounded-3xl shadow-xl h-max pb-6 w-11/12 sm:w-4/5 md:w-3/6 xl:w-2/4 xl:h-3/5 2xl:w-2/5">
        <div className="flex justify-center items-center pt-5 sm:pt-5 xl:pt-10">
          <div>
            {["업체명", "대표번호", "주 소", "업 종"].map((item, key) => {
              return (
                <div key={key} className="w-max ">
                  <span className="font-semibold  text-[12px] sm:text-[14px] xl:text-[16px] xl:pr-3">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="ml-4">
            {bizinfodata.map((item) => {
              return (
                <div className="w-max">
                  <span className="text-gray-500 text-[12px] sm:text-[14px]  xl:text-[16px]">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-3/5 sm:w-2/4	md:w-2/5 lg:w-4/12 xl:w-3/12 2xl:w-1/5">
        <div className="justify-center ">
          <button
            className="bg-slate-500 text-white p-3 text-center rounded-xl w-full mx-auto
            hover:bg-slate-700 hover:text-white
            active:bg-slate-500
            focus:bg-slate-700
            "
            onClick={ImageUpdate}
          >
            업로드 하기
          </button>
        </div>
        <div className="justify-center">
          <button
            className="bg-slate-500 text-white p-3 text-center rounded-xl w-full mx-auto mt-5
            hover:bg-slate-700 hover:text-white
            active:bg-slate-500
            focus:bg-slate-700
            "
            onClick={UpdateConfirm}
          >
            등록 내역 확인
          </button>
        </div>
      </div>
      <div className="text-center pb-28">
        <pre className="text-center text-sm">
          해당 페이지는 {expireddate} 까지 <br></br>접속이 가능합니다.
        </pre>
      </div>
    </div>
  );
}

export default ConsumerMain;
