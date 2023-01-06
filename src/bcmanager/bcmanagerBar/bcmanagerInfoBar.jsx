import React, { useEffect, useState } from "react";

const BcmanagerInfoBar = ({ companyData, companyAll, companyParamsId }) => {
  const [companyName, setcompanyName] = useState();
  const [companyPhoneNumber, setcompanyphoneNumber] = useState();
  const [companyAddress, setcompanyAddress] = useState();
  const [companyCategorys, setcompanyCategorys] = useState();
  const [companyURL, setcompanyURL] = useState([]);

  useEffect(() => {
    companyData.map((item) => {
      setcompanyName(item.company_name);
      setcompanyphoneNumber(item.main_phonenumber);
      setcompanyAddress(item.biz_addr);
      setcompanyCategorys(item.categorys);
    });
  }, [companyData]);

  useEffect(() => {
    const company = companyAll.filter(
      (item) => item.company_name == companyName
    );
    setcompanyURL(company);
  }, [companyAll]);

  return (
    <div className="min-h-screen ">
      <div className=" h-screen w-64 border-r-2 border-slate-300">
        <div className="py-7 px-2">
          <div className="w-full h-40  bg-slate-50 border border-slate-300 rounded-md shadow-md pt-6">
            <p className="text-center text-[20px] ">{companyName}</p>
            <p className="text-center text-[16px]">{companyPhoneNumber}</p>
            <p className="text-center text-[13px]">{companyAddress}</p>
            <p className="text-center text-[14px]">{companyCategorys}</p>
          </div>
        </div>
        <div>
          <p className="w-full bg-gradient-to-t from-slate-200 to-slate-100 py-2 shadow-sm border-2 border-slate-300 mb-px  text-center text-[15px]">
            업로드 목록
          </p>
          <ul className="w-full break-all ">
            {companyURL.map((item) => (
              <li
                className={
                  companyParamsId == item.uuid
                    ? "  bg-gradient-to-t from-sky-700 to-sky-600 text-white break-all shadow-sm  p-4 border-2 border-sky-700  "
                    : "bg-gradient-to-t from-slate-200 to-slate-100  break-all text-slate-600 p-4 shadow-sm border-2 border-slate-300  "
                }
              >
                <a href={`http://localhost:3000/manager/view/${item.uuid}`}>
                  <div>
                    <div className=" break-all">
                      <span className="text-md font-bold px-1">{`${item.uuid}`}</span>
                      <span className="text-sm  px-2">
                        {item.action_dtime.substr(0, 10)}
                        <span className="px-1">
                          {item.action_dtime.substr(11, 5)}
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BcmanagerInfoBar;
