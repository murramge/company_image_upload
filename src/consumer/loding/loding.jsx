import React from "react";

function Loding(props) {
  return (
    <div className=" fixed w-full bg-[#00000092] top-0 left-0 right-0 bottom-0 z-[999] flex flex-col items-center justify-center">
      <i className="xi-spinner-1 xi-spin text-white text-[100px] "></i>
    </div>
  );
}

export default Loding;
