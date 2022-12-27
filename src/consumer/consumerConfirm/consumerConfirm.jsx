import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modals/modal";
import axios from "axios";

const ConsumerConfirm = (props) => {
  //upload 에서 보낸 api 받음
  const [station, setstation] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [promotion, setPromotion] = useState();
  const [switchs, setswitchs] = useState("");
  const [idx, setindex] = useState();

  const [imgs, setimgs] = useState([]);
  const [docs, setdocs] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef("");

  useEffect(() => {
    axios
      .post("/api/bizContent/contentDetail", {
        uuid: id,
      })
      .then((response) => response.data)
      .then(
        (item) =>
          `${setstation(item.data)} 
          )} ${setimgs(Array.from(item.data.images))} 
          ${setdocs(Array.from(item.data.docs))}`
      )
      .catch((error) => console.log(error));
  }, [imgs, docs, promotion]);

  console.log(station);
  console.log(docs);

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
    setimgs(imgs);
    setswitchs("image");
  };

  const docsClick = (e) => {
    e.preventDefault();
    setswitchs("docs");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/bizContent/deleteFile/A3200007/${idx}`)
      .then((response) => console.log(response));

    axios
      .post("/api/bizContent/contentDetail", {
        uuid: id,
      })
      .then((response) => response.data)
      .then(
        (item) =>
          `${setstation(item.data)} ${setimgs(Array.from(item.data.images))} `
      )
      .catch((error) => console.log(error));

    setModalOpen(false);
  };

  const handleDeletid = (e) => {
    e.preventDefault();
    const fileid = e.currentTarget.value;
    axios
      .delete(`/api/bizContent/deleteFile/A3200007/${fileid}`)
      .then((response) => console.log(response));

    axios
      .post("/api/bizContent/contentDetail", {
        uuid: id,
      })
      .then((response) => response.data)
      .then(
        (item) =>
          `${setstation(item.data)} 
           ${setdocs(Array.from(item.data.docs))} `
      )
      .catch((error) => console.log(error));

    setModalOpen(false);
  };

  const dcClick = (e) => {
    const filename = e.currentTarget.innerText;
    const fileid = e.currentTarget.value;
    axios({
      url: `/api/bizContent/download/${fileid}`,
      method: "GET",
      responseType: "blob",
      headers: "Content-Disposition",
    }).then((response) => {
      const blob = new Blob([response.data]);

      // blob을 사용해 객체 URL을 생성합니다.
      const fileObjectUrl = window.URL.createObjectURL(blob);

      // blob 객체 URL을 설정할 링크를 만듭니다.
      const link = document.createElement("a");
      link.href = fileObjectUrl;
      link.style.display = "none";

      // 다운로드 파일 이름을 지정 할 수 있습니다.
      // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.

      console.log(response);

      link.download = filename;
      // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
      document.body.appendChild(link);
      link.click();
      link.remove();

      // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
      window.URL.revokeObjectURL(fileObjectUrl);
    });
  };

  return (
    <>
      <div className="bg-[url(bg.png)] max-h-screen">
        <div className=" p-3 border-y flex justify-between">
          <i
            className="xi-arrow-left text-white text-xl pl-2 cursor-pointer"
            onClick={() => navigate(-1)}
          ></i>
          <span className=" text-white pt-px">등록 내역 확인 및 관리</span>
          <div> </div>
        </div>
        <div></div>
        <div className="grid grid-cols-3 w-max pl-6 lg:pl-24">
          <div className="flex justify-center">
            <button
              className=" m-5 text-white p-3 text-center rounded-xl w-24 mx-auto border-neutral-200 border
            hover:bg-neutral-600 hover:text-white
            focus:bg-neutral-700 focus:text-white"
              onClick={imageClick}
            >
              이미지
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="m-5  text-white p-3 text-center rounded-xl w-24 mx-auto border-neutral-200 border
              hover:bg-neutral-600 hover:text-white
              focus:bg-neutral-700 focus:text-white
            "
              onClick={docsClick}
            >
              문서
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="m-5 text-white text-center rounded-xl w-24 mx-auto  border-neutral-200 border
              hover:bg-neutral-600 hover:text-white
              focus:bg-neutral-700 focus:text-white
            "
              onClick={messageClick}
            >
              홍보 문구
            </button>
          </div>
        </div>
        <div className="p-5 xl:px-20 xl:py-5">
          <div className="bg-white sm:bg-whit p-6 rounded-3xl shadow-xl min-h-[50vh]">
            {switchs == "promotion" && (
              <>
                <textarea
                  value={promotion}
                  onChange={messageChange}
                  className="block border pb-10 w-full min-h-[30vh] border-neutral-300"
                ></textarea>
                <div className=" flex justify-center  ">
                  <button
                    onClick={handleModify}
                    name="message"
                    className=" bg-neutral-500 text-white p-3 m-5 rounded-xl w-full
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700 col-span-3
                w-[20vh]
                lg:w-[30vh]
                "
                  >
                    수정하기
                  </button>
                </div>
              </>
            )}
            <div className="grid grid-cols-3 lg:grid-cols-6">
              {imgs
                .map((image) => image.fileStorageId)
                .map(
                  (image) =>
                    switchs == "image" && (
                      <div className="grid">
                        <button
                          value={image}
                          onClick={openModal}
                          className="xi-close-square text-[30px] text-red-600 absolute"
                        ></button>

                        <Modal
                          open={modalOpen}
                          close={closeModal}
                          header="해당 이미지를 삭제하시겠습니까? (삭제 시 복구 불가능)"
                        >
                          <div className="p-2 grid grid-rows-2 place-items-center">
                            <div className="w-6/12">
                              <button
                                value={image}
                                onClick={handleExit}
                                className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-xl w-full text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                              >
                                취소
                              </button>
                            </div>
                            <div className="w-6/12">
                              <button
                                value={image}
                                onClick={handleDelete}
                                className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-xl w-full  text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                              >
                                확인
                              </button>
                            </div>
                          </div>
                        </Modal>

                        <img
                          ref={imageRef}
                          value={image}
                          src={`/api/bizContent/preview/${image}`}
                          className="rounded-xl p-1 "
                        ></img>
                      </div>
                    )
                )}
            </div>
            <div className="grid lg:grid-cols-3">
              {docs
                .map((doc) => doc.fileStorageId)
                .map(
                  (item, index) =>
                    switchs == "docs" && (
                      <div className="flex">
                        <button
                          value={item}
                          onClick={openModal}
                          className="xi-close-circle-o text-[20px] text-red-600 "
                        ></button>
                        <Modal
                          open={modalOpen}
                          close={closeModal}
                          header="해당 문서를 삭제하시겠습니까? (삭제 시 복구 불가능)"
                        >
                          <div className="p-2 grid grid-rows-2 place-items-center">
                            <div className="w-6/12">
                              <button
                                value={item}
                                onClick={handleExit}
                                className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-xl w-full text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                              >
                                취소
                              </button>
                            </div>
                            <div className="w-6/12">
                              <button
                                value={item}
                                onClick={handleDeletid}
                                className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-xl w-full  text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                              >
                                확인
                              </button>
                            </div>
                          </div>
                        </Modal>
                        <button
                          value={item}
                          onClick={dcClick}
                          className="text-blue-500
                      active:text-violet-700
                      focus:text-violet-700
                    "
                        >
                          <li className="list-none  p-1">
                            {docs[index].originalFilename}
                          </li>
                        </button>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsumerConfirm;
