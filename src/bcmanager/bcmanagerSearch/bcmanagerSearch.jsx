import React, { useRef, useState } from "react";
import BcmanagerBar from "../bcmanagerBar/bcmanagerBar";

const BcmanagerSearch = ({ bizdataSearchCompont, searchlist }) => {
  const searchRef = useRef();
  const [searchvalue, setsearchvalue] = useState();

  const handleSearchValue = (e) => {
    setsearchvalue(searchRef.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bizdataSearchCompont(searchvalue);
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
            <input ref={searchRef} onChange={handleSearchValue}></input>
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
