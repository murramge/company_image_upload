import React, { useRef, useState } from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";
import BcmanagerHeader from "../bcmanagerHeader/bcmanagerHeader";

const BcmanagerSearch = ({ bizdataSearchCompont, searchlist }) => {
  const searchRef = useRef();
  const [searchvalue, setsearchvalue] = useState();
  const [searchload, setsearchload] = useState();

  const handleSearchValue = (e) => {
    setsearchvalue(searchRef.current.value);
  };

  const handleSubmit = (e) => {
    bizdataSearchCompont(searchvalue);
    searchlist.length == 0 && setsearchload("submit");
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <div>
            <BcmanagerHeader></BcmanagerHeader>
          </div>
          <div>
            <BcmanagerBar />
          </div>
        </div>
        <div className="w-full bg-slate-200 ">
          <div className="h-14 bg-sky-700"> </div>
          <div className="h-8 bg-slate-700 text-white px-2 py-1">업체 검색</div>
          <div className="w-full">
            <div className="py-7 bg-slate-100 shadow-sm border-y border-slate-300 ">
              <div className="flex justify-center ">
                <p className="mx-2 my-1">검색어</p>
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  ref={searchRef}
                  onChange={handleSearchValue}
                  onKeyDown={handleOnKeyPress}
                  className="border border-slate-300 border-2 w-2/4 px-2"
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
                  <li className="border">
                    <p className=" px-5 py-2 bg-gray-50">{`${index + 1}. ${
                      item.company_name
                    }, ${item.categorys}`}</p>
                    <p className="px-5 py-2 bg-white">
                      <a
                        className="px-6  text-blue-600"
                        href={`http://localhost:3000/manager/view/${item.uuid}`}
                      >
                        {`- http://localhost:3000/manager/view/${item.uuid}`}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {searchvalue == undefined && <div> 검색어를 입력하세요</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default BcmanagerSearch;
