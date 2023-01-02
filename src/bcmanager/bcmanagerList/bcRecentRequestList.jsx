import React from "react";

function BcRecentRequestList({ recentRequestList }) {
  return (
    <>
      <div>
        <ul>
          {recentRequestList.map((item, index) => (
            <li className="border ">
              <p className=" px-5 py-2 bg-gray-50">{`${index + 1}. ${
                item.company_name
              }, ${item.categorys}`}</p>
              <p className="px-5 py-2 ">
                <a
                  className="px-6 text-blue-600	"
                  href={`http://localhost:3000/manager/view/${item.uuid}`}
                >
                  {`- http://localhost:3000/manager/view/${item.uuid}`}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BcRecentRequestList;
