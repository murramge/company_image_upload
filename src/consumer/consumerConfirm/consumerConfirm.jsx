import React, { useState } from "react";

function ConsumerConfirm(props) {
  const { datas } = props;
  const [promotion, setPromotion] = useState();
  const [images, setimage] = useState([]);
  const [switchs, setswitchs] = useState("");

  const messageClick = () => {
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });

    const { message } = datad;
    setPromotion(message);
    setswitchs("promotion");
  };

  const imageClick = () => {
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });
    console.log(datad);
    const { image } = datad;
    setimage(Array.from(image || []));
    setswitchs("image");
  };
  console.log(switchs);
  console.log(images);

  return (
    <>
      <div className="text-center p-3 bg-slate-500 ">
        <span className="text-center text-white">등록 내역 확인 및 관리</span>
      </div>
      <div className="bg-slate-200 min-h-screen">
        <div className="grid grid-cols-3 w-max p-5 ">
          <div className="flex justify-center">
            <button
              className=" m-5 bg-blue-200 text-black p-3 text-center rounded-xl w-24 mx-auto border-white border
            hover:bg-blue-500 hover:text-white
            focus:bg-blue-700 focus:text-white"
              onClick={imageClick}
            >
              이미지
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="m-5 bg-blue-200 text-black p-3 text-center rounded-xl w-24 mx-auto border-white border
              hover:bg-blue-500 hover:text-white
              focus:bg-blue-700 focus:text-white
            "
            >
              문서
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="m-5 bg-blue-200 text-black text-center rounded-xl w-24 mx-auto border-white border
              hover:bg-blue-500 hover:text-white
              focus:bg-blue-700 focus:text-white
            "
              onClick={messageClick}
            >
              홍보 문구
            </button>
          </div>
        </div>
        <div className="bg-white sm:bg-white md:bg-white lg:bg-orange-400 xl:bg-purple-300 2xl:bg-amber-300 p-6 rounded-3xl shadow-xl h-96">
          {switchs == "promotion" && <textarea value={promotion}></textarea>}
          {images.map((image) => switchs == "image" && <img src={image}></img>)}
        </div>
      </div>
    </>
  );
}

export default ConsumerConfirm;
