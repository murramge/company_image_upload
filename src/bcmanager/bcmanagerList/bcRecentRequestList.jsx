import React from "react";

function BcRecentRequestList({ recentRequestList }) {
  return (
    <>
      <div>
        <ul>
          {recentRequestList.map((item, index) => (
            <li className="p-3 ">
              {`${index + 1}. ${item.company_name}, ${item.categorys}`}
              <a className="px-6" href={`http://localhost:3000/manager`}>
                {" "}
                {`- http://localhost:3000/manager`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BcRecentRequestList;
