import React, { useRef, useState } from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";

const BcmanagerSearch = ({ bizdataSearchCompont, searchlist }) => {
  const searchRef = useRef();
  const [searchvalue, setsearchvalue] = useState();

  const handleSearchValue = (e) => {
    setsearchvalue(searchRef.current.value);
  };

  const handleSubmit = (e) => {
    bizdataSearchCompont(searchvalue);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="flex">
        <BcmanagerBar />
        <div className="w-full bg-red-200">
          <div>
            <p className="text-center">업체 검색</p>
          </div>
          <div className="flex justify-center">
            <p>검색어</p>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              ref={searchRef}
              onChange={handleSearchValue}
              onKeyDown={handleOnKeyPress}
            ></input>
            <button onClick={handleSubmit}>검색하기</button>
          </div>
          <ul>
            {searchlist.map((item, index) => (
              <li>
                {`${index + 1}. ${item.company_name}, ${item.categorys}`}
                <br></br>-
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BcmanagerSearch;
