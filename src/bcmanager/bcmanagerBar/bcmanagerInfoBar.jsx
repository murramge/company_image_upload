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
    <div className="max-h-screen bg-slate-200">
      <div className="w-56 h-screen border-r-2 border-slate-300">
        <div className="py-7 px-2">
          <div className="w-full h-40  bg-slate-50 border border-slate-300 rounded-md shadow-md">
            <p>{companyName}</p>
            <p>{companyPhoneNumber}</p>
            <p>{companyAddress}</p>
            <p>{companyCategorys}</p>
          </div>
        </div>
        <div>
          <button onClick={handleOpen}>전체 보기</button>
          {isOpen && (
            <ul>
              {companyURL.map((item) => (
                <li>
                  <a
                    href={`http://localhost:3000/manager/view/${item.uuid}`}
                  >{`-http://localhost:3000/manager/view/${item.uuid}`}</a>
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
