import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modals/modal";
import axios from "axios";

const ConsumerConfirm = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [promotion, setPromotion] = useState();
  const [switchs, setswitchs] = useState("");
  const [idx, setindex] = useState();
  const [station, setstation] = useState([]);
  const [imglength, setimglength] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef("");

  //upload 에서 보낸 api 받음
  useEffect(() => {
    axios
      .post("/api/bizContent/contentDetail", {
        uuid: id,
      })
      .then((response) => response.data)
      .then(
        (item) =>
          `${setstation(item.data)} ${setimglength(
            parseInt(item.data.images.length)
          )} `
      )
      .catch((error) => console.log(error));
  }, []);

  //fileStorageId image 받음
  let arr = [];
  for (let i = 0; i < imglength; i++) {
    arr.push(station.images[i].fileStorageId || "");
  }

  //modal part (팝업)
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

  //홍보문구 클릭 시, 저장되어있는 메시지 출력
  const messageClick = () => {
    setPromotion(station.businessMemo);
    setswitchs("promotion");
  };

  //홍보문구 수정할 수 있게 textarea를 onchange로 만듬 (onChange 기능)
  const messageChange = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setPromotion(value);
  };

  //홍보문구 수정하기 버튼 클릭 시 data 수정
  const handleModify = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uuid", id);
    formData.append("businessMemo", promotion);
    axios
      .post("/api/bizContent/putContent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .then((item) => setstation(item.data))
      .catch((error) => {
        console.log("failed", error);
      });
  };

  //이미지 클릭 시 image 뜨게
  const imageClick = (e) => {
    e.preventDefault();
    setswitchs("image");
  };

  const handleDelete = () => {
    axios
      .delete(`/api/bizContent/deleteFile/A3200007/${idx}`)
      .then((response) => console.log(response));

    setModalOpen(false);
    navigate(`/confirm/${id}`);
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

          {arr.map(
            (image, index) =>
              switchs == "image" && (
                <>
                  <button value={image} onClick={openModal}>
                    x
                  </button>

                  <Modal
                    open={modalOpen}
                    close={closeModal}
                    header="해당 이미지를 삭제하시겠습니까?
                    (삭제 시 복구 불가능)"
                  >
                    <button
                      value={image}
                      onClick={handleExit}
                      className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                      hover:bg-blue-700 hover:text-white
                      active:bg-blue-500
                      focus:bg-blue-700"
                    >
                      취소
                    </button>
                    <button
                      value={image}
                      onClick={handleDelete}
                      className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                      hover:bg-blue-700 hover:text-white
                      active:bg-blue-500
                      focus:bg-blue-700"
                    >
                      확인
                    </button>
                  </Modal>

                  <img
                    ref={imageRef}
                    value={image}
                    src={`/api/bizContent/preview/${image}`}
                    width={20}
                    height={20}
                  ></img>
                </>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ConsumerConfirm;
