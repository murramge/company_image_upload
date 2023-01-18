import React, { useRef, useState, useEffect } from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";
import BcmanagerHeader from "../bcmanagerHeader/bcmanagerHeader";
import { useNavigate } from "react-router";

const BcmanagerSearch = ({
  bizdataSearchCompont,
  searchlist,
  nonexistcompany,
}) => {
  const searchRef = useRef();
  const [searchvalue, setsearchvalue] = useState();
  const [switchs, setswitchs] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate(`/manager/login`);
    }
  }, []);

  useEffect(() => {
    setswitchs("search");
  }, []);

  const handleSearchValue = (e) => {
    setsearchvalue(searchRef.current.value);
  };

  const handleSubmit = (e) => {
    if (searchvalue) {
      bizdataSearchCompont(searchvalue);
    }
  };
  const handleLogOut = () => {
    if (localStorage.getItem("id")) {
      localStorage.removeItem("id");
      localStorage.removeItem("password");
      localStorage.removeItem("name");
      navigate(`/manager/login`);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="flex ">
        <div className=" bg-slate-200">
          <div>
            <BcmanagerHeader></BcmanagerHeader>
          </div>
          <div>
            <BcmanagerBar switchs={switchs} />
          </div>
        </div>
        <div className="w-full bg-slate-200 ">
          <div className="h-14 bg-sky-700  flex justify-end">
            <span className="text-white py-4">
              {localStorage.getItem("name")} 님
            </span>
            <button
              className=" w-max h-10 p-2 m-2 text-sky-700 text-[20px] bg-blue-100 hover:bg-blue-200 focus:bg-blue-100 shadow-sm border-2 border-slate-300 mb-px text-center text-[15px]
            "
              onClick={handleLogOut}
            >
              로그아웃
            </button>
          </div>
          <div className="h-8 bg-slate-700 text-white px-2 py-1">업체 검색</div>
          <div className="w-full">
            <div className="py-10 bg-slate-100 shadow-sm border-y border-slate-300 w-full">
              <div className="flex justify-center ">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  ref={searchRef}
                  onChange={handleSearchValue}
                  onKeyDown={handleOnKeyPress}
                  className="border border-slate-300 border-2 w-2/4 p-2"
                ></input>
                <button
                  onClick={handleSubmit}
                  className="border border-slate-500 w-20 mx-2 bg-blue-500 text-white "
                >
                  검색
                </button>
              </div>
              <p className="text-center py-2">
                업체명, 전화번호 등으로 검색 가능합니다.
              </p>
            </div>

            {searchlist && (
              <ul>
                {searchlist.map((item, index) => (
                  <li key={index} className="border">
                    <p className=" px-5 py-2 bg-gray-50">{`${index + 1}. ${
                      item.company_name
                    }, ${item.categorys}`}</p>
                    <p className="px-5 py-2 bg-white">
                      <a
                        className="px-6  text-blue-600"
                        href={`http://localhost:3000/manager/view/${item.uuid}`}
                      >
                        {`- ${item.url_subject}`}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {nonexistcompany && (
              <div className="text-center p-10">{nonexistcompany}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BcmanagerSearch;
