import React, { useEffect, useState } from "react";

const BcmanagerInfoBar = ({ companyData, companyAll }) => {
  const [companyName, setcompanyName] = useState();
  const [companyPhoneNumber, setcompanyphoneNumber] = useState();
  const [companyAddress, setcompanyAddress] = useState();
  const [companyCategorys, setcompanyCategorys] = useState();
  const [companyURL, setcompanyURL] = useState();
  const [isOpen, setisOpen] = useState(false);

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

  const handleOpen = (e) => {
    setisOpen((isOpen) => !isOpen);
  };

  return (
    <div className="min-h-screen ">
      <div className=" h-screen w-64  bg-slate-200">
        <div className="py-7 px-2">
          <div className="w-full h-40  bg-slate-50 border border-slate-300 rounded-md shadow-md pt-6">
            <p className="text-center text-[20px] ">{companyName}</p>
            <p className="text-center text-[17px]">{companyPhoneNumber}</p>
            <p className="text-center text-[15px]">{companyAddress}</p>
            <p className="text-center text-[15px]">{companyCategorys}</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleOpen}
            className="w-full bg-gradient-to-t from-slate-200 to-slate-100 p-1 shadow-sm border-2 border-slate-300 mb-px text-left pl-5"
          >
            <div className="flex justify-between">
              <p>전체 보기</p>
              <i className="xi-angle-down pr-4 pt-1"></i>
            </div>
          </button>
          {isOpen && (
            <ul className="w-full break-all">
              {companyURL.map((item) => (
                <li className="  break-all p-4 bg-slate-100  border-2 border-slate-300 mb-px">
                  <a href={`http://localhost:3000/manager/view/${item.uuid}`}>
                    <p className=" break-all">{`http://localhost:3000/manager/view/${item.uuid}`}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BcmanagerInfoBar;
