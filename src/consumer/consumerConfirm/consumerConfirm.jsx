import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConsumerConfirm = (props) => {
  const { datas, onUpdate } = props;
  const [promotion, setPromotion] = useState();
  const [messagesave, setmessagesave] = useState();
  const [images, setimage] = useState([]);
  const [switchs, setswitchs] = useState("");
  const [idx, setindex] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const messageClick = () => {
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });

    const { message } = datad;
    setPromotion(message);
    setswitchs("promotion");
  };

  const messageChange = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setPromotion(value);
  };

  const imageClick = () => {
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });

    const { image } = datad;
    setimage(Array.from(image || []));
    setswitchs("image");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });
    const { ide } = datad;
    const index = e.target.value;
    setindex(index);
    images.splice(index, 1);
    console.log(images);
    setimage(images);
    onUpdate({ ide: ide, message: promotion, image: images || [] });
    return images;
  };

  console.log(images);

  const handleModify = (e) => {
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });
    const { ide } = datad;

    e.preventDefault();
    console.log(ide);
    onUpdate({ ide: ide, [e.target.name]: promotion, image: images || [] });
  };
  console.log(datas);
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
          {switchs == "promotion" && (
            <>
              <textarea value={promotion} onChange={messageChange}></textarea>
              <button onClick={handleModify} name="message">
                수정하기
              </button>
            </>
          )}
          {images.map(
            (image, index) =>
              switchs == "image" && (
                <>
                  <button value={index} onClick={handleDelete}>
                    ❌
                  </button>
                  <img value={index} src={image}></img>
                </>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ConsumerConfirm;
