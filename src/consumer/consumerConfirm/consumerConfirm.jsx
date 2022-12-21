import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modals/modal";
import axios from "axios";

const ConsumerConfirm = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { datas, onUpdate } = props;
  const [promotion, setPromotion] = useState();
  const [filestorageId, setfilestorageId] = useState();
  const [images, setimage] = useState([]);
  const [switchs, setswitchs] = useState("");
  const [idx, setindex] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [station, setstation] = useState([]);
  const [iimmgg, setiimmgg] = useState([]);

  useEffect(() => {
    axios
      .post(
        "/api/bizContent/contentDetail",
        {
          uuid: "A3200007",
        },
        {}
      )
      .then((response) => response.data)
      .then((item) => setstation(item.data))
      .catch((error) => console.log(error));
  }, []);

  // console.log(station);

  const handleExit = () => {
    setModalOpen(false);
  };
  const openModal = (e) => {
    e.preventDefault();

    setindex(e.currentTarget.value);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
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
    // let datad;
    // Object.keys(datas).map((key) => {
    //   datad = datas[key];
    // });

    // const { image } = datad;
    // setimage(Array.from(image || []));
    // setswitchs("image");

    axios
      .get(`/api/bizContent/preview/${50992}`)
      .then((response) => setiimmgg(response.request.responseURL));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });
    const { ide } = datad;
    const index = e.target.value;
    setindex(idx);
    images.splice(idx, 1);

    setimage(images);
    onUpdate({ ide: ide, message: promotion, image: images || [] });
    setModalOpen(false);
    return images;
  };

  const handleModify = (e) => {
    let datad;
    Object.keys(datas).map((key) => {
      datad = datas[key];
    });
    const { ide } = datad;

    e.preventDefault();

    onUpdate({ ide: ide, [e.target.name]: promotion, image: images || [] });
  };

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

          {<img src={iimmgg}></img>}
          {images.map(
            (image, index) =>
              switchs == "image" && (
                <>
                  <button value={index} onClick={openModal}>
                    x
                  </button>

                  <Modal
                    open={modalOpen}
                    close={closeModal}
                    header="해당 이미지를 삭제하시겠습니까?
                    (삭제 시 복구 불가능)"
                  >
                    <button
                      value={index}
                      onClick={handleExit}
                      className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                      hover:bg-blue-700 hover:text-white
                      active:bg-blue-500
                      focus:bg-blue-700"
                    >
                      취소
                    </button>
                    <button
                      value={index}
                      onClick={handleDelete}
                      className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                      hover:bg-blue-700 hover:text-white
                      active:bg-blue-500
                      focus:bg-blue-700"
                    >
                      확인
                    </button>
                  </Modal>

                  <img value={index} src={image} width={20} height={20}></img>
                </>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ConsumerConfirm;
