import React from "react";

function BcRecentUploadList({ recentUploadList }) {
  return (
    <>
      <div>
        <ul>
          {recentUploadList.map((item, index) => (
            <li>
              {`${index + 1}. ${item.company_name}, ${item.categorys}`}
              <br></br>-
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BcRecentUploadList;
