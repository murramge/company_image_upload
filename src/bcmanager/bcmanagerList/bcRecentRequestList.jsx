import React from "react";

function BcRecentRequestList({ recentRequestList }) {
  return (
    <>
      <div>
        <ul>
          {recentRequestList.map((item, index) => (
            <li className="p-3 ">
              {`${index + 1}. ${item.company_name}, ${item.categorys}`}
              <p>
                <a
                  className="px-6"
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
