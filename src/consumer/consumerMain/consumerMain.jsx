import React, { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConsumerMain = memo(
  ({ handlebizInfoUpdate, infolist, bizdata, handlebizDataUpdate }) => {
    const [bizinfolist, setbizinfo] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      handlebizInfoUpdate(id);
    }, []);

    useEffect(() => {
      handlebizDataUpdate(id);
    }, []);

    useEffect(() => {
      setbizinfo(infolist);
    }, [infolist]);

    const [bizinfodata, setbizinfodata] = useState([]);
    const [expireddate, setexpireddate] = useState();

    //업로드, 등록 버튼 1개만 보여지게 하기 위해 data 값 확인
    const isEmpty =
      bizdata.businessMemo == "" &&
      bizdata.images.length == 0 &&
      bizdata.docs.length == 0
        ? true
        : false;

    const bizInfo = Array(bizinfolist).reduce((dt, item) => {
      dt = dt.concat(item);
      return dt;
    }, []);

    const bizinfo_uuid = String(bizinfolist.uuid);
    const bizinfo_company = String(bizinfolist.company_name);

    useEffect(() => {
      bizInfo.forEach((item) => {
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
    }, [bizinfolist]);

    const handleImageUpdate = () => {
      navigate(`/${id}/upload`);
    };

    const handleUpdateConfirm = () => {
      navigate(`/${id}/confirm`);
    };

    return (
      <div className="bg-[url(bg.png)] bg-cover grid grid-rows-3 place-items-center w-screen min-h-screen">
        <div>
          <div className="w-screen flex justify-center">
            <img
              src="head1m.png"
              className="w-2/3 sm:w-2/4 md:w-5/12 lg:w-2/6 xl:w-1/4"
            ></img>
          </div>
          <p className=" text-[15px] sm:text-[16px] xl:text-[18px] text-center pt-5 text-white font-light">
            <span>현 페이지는 </span>
            <span className="text-red-300 font-bold text-[18px]">
              {bizinfo_company}
            </span>
            <span> 사업장 전용 페이지입니다.</span>
          </p>
        </div>
        <div className="w-full flex justify-center pb-10">
          <div className="bg-white rounded-md shadow-sm h-max pb-6 w-11/12 sm:w-4/5 md:w-3/6 xl:w-2/4 xl:h-4/5 2xl:w-2/5">
            <div className="flex justify-center items-center pt-5 xl:pt-8 w-full">
              <div className="w-full pl-10 sm:pl-20 xl:pl-30 2xl:p1-40">
                {bizinfodata.map((item, key) => {
                  return (
                    <div key={key}>
                      <div key={key} className="flex text-[16px]">
                        <div className="w-[25%] p-1">
                          <span className="font-bold">{item.name}</span>
                        </div>
                        <div className="w-[75%] pr-6 pt-1">
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
          {isEmpty === true && (
            <div className="justify-center ">
              <button
                className="bg-neutral-500 text-white p-3 text-center rounded-xl w-full mx-auto
            hover:bg-neutral-700 hover:text-white
            active:bg-neutral-500
            focus:bg-neutral-700
            "
                onClick={handleImageUpdate}
              >
                업로드 하기
              </button>
            </div>
          )}
          {isEmpty === false && (
            <div className="justify-center">
              <button
                className="bg-neutral-500 text-white p-3 text-center rounded-xl w-full mx-auto mb-10
            hover:bg-neutral-700 hover:text-white
            active:bg-neutral-500
            focus:bg-neutral-700
            "
                onClick={handleUpdateConfirm}
              >
                등록 내역 확인
              </button>
            </div>
          )}
        </div>
        <div className="text-center pb-28">
          <p className="text-center text-sm">
            해당 페이지는 {expireddate} 까지 <br></br>접속이 가능합니다.
          </p>
        </div>
      </div>
    );
  }
);

export default ConsumerMain;
