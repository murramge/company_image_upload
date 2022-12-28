import React, { useEffect, useState } from "react";

function BcmanagerList({ onRecentRequest }) {
  console.log(onRecentRequest.map((item, index) => item));
  return (
    <ul>
      {onRecentRequest.map((item, index) => (
        <li>
          {`${index + 1}. ${item.company_name}, ${item.categorys}`}
          <br></br>-
        </li>
      ))}
    </ul>
  );
}

export default BcmanagerList;
