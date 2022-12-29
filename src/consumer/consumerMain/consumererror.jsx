import React from "react";

function Consumererror({ errormessage }) {
  console.log(errormessage);
  return <div>{errormessage}</div>;
}

export default Consumererror;
