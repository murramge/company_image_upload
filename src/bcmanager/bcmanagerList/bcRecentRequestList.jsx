import React from "react";

function BcRecentRequestList({ recentRequestList }) {
  return (
    <>
      <div>
        <ul>
          {recentRequestList.map((item, index) => (
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

export default BcRecentRequestList;
