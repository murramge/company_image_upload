import React from "react";

function BcRecentUploadList({ recentUploadList }) {
  return (
    <>
      <div className="max-h-[45vh] overflow-y-scroll">
        <ul>
          {recentUploadList.map((item, index) => (
            <li key={index} className="border">
              <p className=" px-5 py-2 bg-gray-50">{`${index + 1}. ${
                item.company_name
              }, ${item.categorys}`}</p>
              <p className="px-5 py-2 bg-white ">
                <a
                  className="px-6 text-blue-600"
                  href={`http://localhost:3000/manager/view/${item.uuid}`}
                >
                  {`- ${item.url_subject}`}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BcRecentUploadList;
