import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ConsumerMain(props) {
  const [bizinfo, setbizinfo] = useState([]);
  const [errorcode, seterrorcode] = useState();
  const config = {
    method: "get",
    url: "/api/bizContent/info/A3200007",
    headers: {},
  };

  useEffect(() => {
    axios(config)
      .then((response) => response.data)
      .then((item) => `${setbizinfo(item.data)} ${seterrorcode(item.code)}`)
      .catch((error) => console.log(error));
  }, []);

  console.log(errorcode);

  const { id } = useParams();

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

  if (errorcode != 0) {
    navigate(`/confirm/${id}`);
  }

  return (
    <div className="bg-slate-300 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center py-20  min-h-screen ">
      <div className="bg-white sm:bg-white md:bg-white lg:bg-orange-400 xl:bg-purple-300 2xl:bg-amber-300 p-6 rounded-3xl shadow-xl  h-max">
        <div className="flex justify-between ">
          <div>
            {["업체명", "대표번호", "주 소", "업 종"].map((item, key) => {
              return (
                <div key={key} className="flex justify-between my-2 w-max">
                  <span className="font-semibold text-base">{item}</span>
                </div>
              );
            })}
          </div>
          <div className="ml-4">
            {bizinfodata.map((item) => {
              return (
                <div className="flex justify-between my-2 w-max">
                  <span className="text-gray-500 ">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className=" h-40 m-5">
        <div className="flex justify-center">
          <button
            className=" m-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-auto
            hover:bg-blue-700 hover:text-white
            active:bg-blue-500
            focus:bg-blue-700
            "
            onClick={ImageUpdate}
          >
            업로드 하기
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="m-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-auto
            hover:bg-blue-700 hover:text-white
            active:bg-blue-500
            focus:bg-blue-700
            "
            onClick={UpdateConfirm}
          >
            등록 내역 확인
          </button>
        </div>
      </div>
      <div className="text-center">
        <span className="text-center">
          해당 페이지는 {expireddate} 까지 접속이 가능합니다.
        </span>
      </div>
    </div>
  );
}

export default ConsumerMain;
