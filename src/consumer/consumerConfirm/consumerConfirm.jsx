import React, { useState, useEffect, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modals/modal";
import ModalPortal from "../modals/modalPotal.tsx";
import axios from "axios";
import loadImage from "blueimp-load-image";

function DeleteButton(props) {
  return (
    <button
      style={{
        backgroundColor: "red",
        display: "inline-block",
        position: "absolute",
        textAlign: "center",
        width: 25,
        height: 25,
        cursor: "pointer",
      }}
      {...props}
    >
      <i style={{ color: "white", fontSize: "0.8rem" }} className="xi-close" />
    </button>
  );
}

const ConsumerConfirm = memo(
  ({
    handlebizDataUpdate,
    bizdata,
    dataimgs,
    datadocs,
    handlebizPutdataUpdate,
  }) => {
    //upload 에서 보낸 api 받음
    const [data, setdata] = useState([]);

    const [promotion, setPromotion] = useState();
    const [switchs, setswitchs] = useState("image");
    const [fileid, setfileid] = useState();
    const [imgs, setimgs] = useState([]);
    const [docs, setdocs] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      handlebizDataUpdate(id);
    }, []);

    useEffect(() => {
      setdata(bizdata);
      setimgs(dataimgs);
      setdocs(datadocs);
    }, [bizdata || dataimgs || datadocs]);

    //홍보문구 클릭 시, 저장되어있는 메시지 출력
    const handleMessageMenuClick = () => {
      setPromotion(data.businessMemo);
      setswitchs("promotion");
    };

    //홍보문구 수정할 수 있게 textarea를 onchange로 만듬 (onChange 기능)
    const handleMessageonChange = (e) => {
      e.preventDefault();
      const value = e.currentTarget.value;
      setPromotion(value);
    };

    //홍보문구 수정하기 버튼 클릭 시 data 수정
    const handleMessageModify = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("uuid", id);
      formData.append("businessMemo", promotion);
      const modify = "modify";
      handlebizPutdataUpdate(
        formData,
        () => {
          handlebizDataUpdate(id);
        },
        modify
      );
    };

    //버튼클릭 시 데이터 뜰 수 있게
    const handleImageMenuClick = (e) => {
      e.preventDefault();
      setimgs(imgs);
      setswitchs("image");
    };

    const handleDocsMenuClick = (e) => {
      e.preventDefault();
      setswitchs("docs");
    };

    //이미지,문서 삭제
    const handleDataDelete = (e) => {
      e.preventDefault();
      axios
        .delete(`/api/bizContent/deleteFile/A3200007/${fileid}`)
        .then((response) => console.log(response));

      handlebizDataUpdate(id);
      setModalOpen(false);
    };

    function rotateImageFile(file) {
      return new Promise((resolve, reject) => {
        loadImage(file, { meta: true, canvas: true, orientation: true }).then(
          (img) => {
            img.image.toBlob((blob) => {
              resolve(new File([blob], `${file.name}.jpg`));
            }, "image/jpeg");
          }
        );
      });
    }

    const handleCaptureImageUpload = (e) => {
      e.preventDefault();
      let input = document.createElement("input");

      input.type = "file";
      input.accept = "image/*";
      input.multiple = "multiple";
      input.capture = "camera";
      document.body.appendChild(input);
      input.click();
      input.onchange = function (e) {
        const imageFileArr = e.target.files;
        const formData = new FormData();
        formData.append("uuid", id);

        const loadedImages = Array.from(imageFileArr).map((file) =>
          rotateImageFile(file)
        );

        Promise.all(loadedImages).then((result) => {
          Array.from(result).forEach((file) => {
            formData.append("images", file);
          });
          handlebizPutdataUpdate(formData, () => {
            handlebizDataUpdate(id);
          });
          document.body.removeChild(input);
        });
      };

      e.target.value = "";
      setimageModalOpen(false);
    };

    const handleAllremove = (e) => {
      imgs
        .map((image) => image.fileStorageId)
        .map((image) =>
          axios
            .delete(`/api/bizContent/deleteFile/A3200007/${image}`)
            .then((response) => console.log(response))
        );

      handlebizDataUpdate(id);
    };

    const handleGalleryImageUpload = (e) => {
      e.preventDefault();
      let input = document.createElement("input");

      input.type = "file";
      input.accept = "image/*";
      input.multiple = "multiple";

      input.click();
      input.onchange = function (e) {
        const imageFileArr = e.target.files;
        const formData = new FormData();
        formData.append("uuid", id);

        const loadedImages = Array.from(imageFileArr).map((file) =>
          rotateImageFile(file)
        );

        Promise.all(loadedImages).then((result) => {
          Array.from(result).forEach((file) => {
            formData.append("images", file);
          });
          handlebizPutdataUpdate(formData, () => {
            handlebizDataUpdate(id);
          });
        });
      };

      e.target.value = "";
      setimageModalOpen(false);
    };

    const handlePutDocs = (e) => {
      e.preventDefault();

      let input = document.createElement("input");
      input.type = "file";
      input.multiple = "multiple";
      input.click();
      input.onchange = function (e) {
        const docsFileArr = e.target.files;
        let docsfiles = [];
        let file;
        let filesLength = docsFileArr.length > 10 ? 10 : docsFileArr.length;
        const formData = new FormData();
        formData.append("uuid", id);
        for (let i = 0; i < filesLength; i++) {
          file = docsFileArr[i];
          docsfiles[i] = file;
          formData.append("docs", file);
        }

        handlebizPutdataUpdate(formData, () => {
          handlebizDataUpdate(id);
        });
      };
      e.target.value = "";
    };

    const handleDocsDownload = (e) => {
      // const filename = e.currentTarget.innerText;
      const fileid = e.currentTarget.value;
      const filter = docs.filter((item, index) => item.fileStorageId == fileid);
      const filename = filter[0].originalFilename;
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

        link.download = filename;

        // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
        document.body.appendChild(link);
        link.click();
        link.remove();

        // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
        window.URL.revokeObjectURL(fileObjectUrl);
      });
    };

    //modal part (팝업)
    const [modalOpen, setModalOpen] = useState(false);
    const [allRemoveOpen, setAllRemoveOpen] = useState(false);
    const [imagemodalOpen, setimageModalOpen] = useState(false);

    const handleOpenModal = (e) => {
      e.preventDefault();
      setfileid(e.currentTarget.value || "");
      setModalOpen(true);
    };

    const handleRemoveOpenModal = (e) => {
      setAllRemoveOpen(true);
    };
    const handleRemoveCloseModal = (e) => {
      setAllRemoveOpen(false);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleImageOpenModal = (e) => {
      e.preventDefault();
      setimageModalOpen(true);
    };
    const handleImageCloseModal = () => {
      setimageModalOpen(false);
    };

    return (
      <>
        <div className="text-center bg-neutral-600  p-2 flex justify-between w-full">
          <i
            className="xi-arrow-left text-white text-xl pl-2 cursor-pointer"
            onClick={() => navigate(`/${id}`)}
          ></i>
          <span className=" text-white pt-px">등록 내역 확인 및 관리</span>
          <div> </div>
        </div>
        <div className="bg-[url(bg.png)] h-screen">
          <div className="grid grid-cols-3 gap-1 w-max pt-6 px-3 xl:px-20">
            <div className="flex justify-center">
              <button
                className={`${
                  switchs == "image"
                    ? " bg-white text-black  "
                    : "bg-neutral-600"
                } 	text-white p-3 text-center w-24 mx-auto 
               `}
                onClick={handleImageMenuClick}
                id="imgclick"
              >
                이미지
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className={`${
                  switchs == "docs"
                    ? " bg-white text-black "
                    : "bg-neutral-600 "
                } bg-netural-600 text-white p-3 text-center w-24 mx-auto 
               `}
                onClick={handleDocsMenuClick}
              >
                문서
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className={`${
                  switchs == "promotion"
                    ? "bg-white text-black"
                    : "bg-neutral-600 "
                }text-white p-3 text-center  w-24 mx-auto 
            `}
                onClick={handleMessageMenuClick}
              >
                홍보 문구
              </button>
            </div>
          </div>
          <div className="  h-screen px-3 xl:px-20">
            <div className="bg-white  p-6 rounded-b-lg shadow-md min-h-[50vh]">
              {switchs == "promotion" && (
                <>
                  <textarea
                    value={promotion}
                    onChange={handleMessageonChange}
                    className="block border pb-10 w-full min-h-[30vh] border-neutral-300 p-2"
                  ></textarea>
                  <div className=" flex justify-center  ">
                    <button
                      onClick={handleMessageModify}
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
              {switchs == "image" && (
                <>
                  <Modal
                    open={modalOpen}
                    close={handleCloseModal}
                    header={
                      <p>
                        해당 이미지를 삭제하시겠습니까? <br></br> (삭제 시 복구
                        불가능)
                      </p>
                    }
                    head="이미지 삭제"
                  >
                    <div className="flex justify-end">
                      <div className="w-max px-1">
                        <button
                          onClick={handleCloseModal}
                          className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-3xl w-full text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                        >
                          취소
                        </button>
                      </div>
                      <div className="w-max">
                        <button
                          onClick={handleDataDelete}
                          className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-3xl w-full  text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </Modal>

                  <Modal
                    open={allRemoveOpen}
                    close={handleRemoveCloseModal}
                    header={
                      <p>
                        이미지를 전체 삭제하시겠습니까? <br></br> (삭제 시 복구
                        불가능)
                      </p>
                    }
                    head="이미지 삭제"
                  >
                    <div className="flex justify-end">
                      <div className="w-max px-1">
                        <button
                          onClick={handleRemoveCloseModal}
                          className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-3xl w-full text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                        >
                          취소
                        </button>
                      </div>
                      <div className="w-max">
                        <button
                          onClick={handleAllremove}
                          className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-3xl w-full  text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </Modal>
                  {imgs.length !== 0 && (
                    <button
                      onClick={handleRemoveOpenModal}
                      className="w-max p-1 my-2 text-red-500  hover:bg-red-50 focus:bg-red-100 shadow-sm border border-red-300 text-sm text-center text-[15px]"
                    >
                      전체삭제
                    </button>
                  )}
                  <div className="min-h-[30vh]">
                    <div className="grid grid-cols-3 lg:grid-cols-6">
                      {imgs
                        .map((image) => image.fileStorageId)
                        .map((image, index) => (
                          <div key={index} className="grid">
                            <DeleteButton
                              key={index}
                              value={image}
                              onClick={handleOpenModal}
                            />

                            <img
                              key={image}
                              value={image}
                              src={`/api/bizContent/preview/${image}`}
                              className=" p-1 object-cover h-[100%] w-[100%] "
                            ></img>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handleImageOpenModal}
                      name="image"
                      className="bg-neutral-500 text-white p-3 m-5 rounded-xl w-full
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700 
                w-[20vh]
                lg:w-[30vh]
                "
                    >
                      추가하기
                    </button>
                    <Modal
                      open={imagemodalOpen}
                      close={handleImageCloseModal}
                      notmain="notmain"
                      head="이미지 업로드"
                    >
                      <div className="flex justify-end">
                        <button
                          className="bg-neutral-500 text-white p-3 m-1 text-center rounded-md w-max text-sm
                           hover:bg-neutral-700 hover:text-white
                           active:bg-neutral-500
                           focus:bg-neutral-700
                           cursor-pointer "
                          onClick={handleCaptureImageUpload}
                        >
                          카메라 촬영
                        </button>
                        <button
                          className="bg-neutral-500 text-white p-2 m-1 text-center rounded-md w-max text-sm
                      hover:bg-neutral-700 hover:text-white
                      active:bg-neutral-500
                      focus:bg-neutral-700
                      cursor-pointer"
                          onClick={handleGalleryImageUpload}
                        >
                          이미지 선택
                        </button>
                      </div>
                    </Modal>
                  </div>
                </>
              )}
              {switchs == "docs" && (
                <>
                  <Modal
                    open={modalOpen}
                    close={handleCloseModal}
                    header={
                      <p>
                        해당 문서를 삭제하시겠습니까? <br></br> (삭제 시 복구
                        불가능)
                      </p>
                    }
                    head="문서 삭제"
                  >
                    <div className="flex justify-end">
                      <div className="w-max px-1">
                        <button
                          onClick={handleCloseModal}
                          className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-3xl w-full text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                        >
                          취소
                        </button>
                      </div>
                      <div className="w-max">
                        <button
                          onClick={handleDataDelete}
                          className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-3xl w-full  text-sm
                              hover:bg-neutral-700 hover:text-white
                              active:bg-neutral-500
                              focus:bg-neutral-700"
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </Modal>
                  <div className="min-h-[30vh]">
                    <div className="grid lg:grid-cols-3">
                      {docs
                        .map((doc) => doc.fileStorageId)
                        .map((item, index) => (
                          <div key={item} className="flex">
                            <button
                              key={item}
                              value={item}
                              onClick={handleOpenModal}
                              className="xi-close-circle-o text-[20px] text-red-600 "
                            ></button>

                            <button
                              key={index}
                              value={item}
                              onClick={handleDocsDownload}
                              className="text-blue-500
                      active:text-violet-700
                      focus:text-violet-700
                    "
                            >
                              <li
                                key={index}
                                className="list-none  p-1 text-left"
                              >
                                {docs[index].originalFilename}
                              </li>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handlePutDocs}
                      name="image"
                      className="bg-neutral-500 text-white p-3 m-5 rounded-xl w-full
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700 
                w-[20vh]
                lg:w-[30vh]
                "
                    >
                      추가하기
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ConsumerConfirm;
