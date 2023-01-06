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
            <p className="text-center text-[17px]">{companyPhoneNumber}</p>
            <p className="text-center text-[15px]">{companyAddress}</p>
            <p className="text-center text-[15px]">{companyCategorys}</p>
          </div>
        </div>
        <div>
          <ul className="w-full break-all">
            {companyURL.map((item) => (
              <li
                className={
                  companyParamsId == item.uuid
                    ? "  bg-slate-300 text-violet-800 border border-slate-400 break-all p-4 border-2 border-slate-300 mb-px"
                    : "bg-slate-100 break-all text-blue-500 p-4 border-2 border-slate-300 mb-px"
                }
              >
                <a href={`http://localhost:3000/manager/view/${item.uuid}`}>
                  <div>
                    <p
                      className=" break-all
                      active:text-violet-700
                      focus:text-violet-700
                    "
                    >{`http://localhost:3000/manager/view/${item.uuid}`}</p>
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
