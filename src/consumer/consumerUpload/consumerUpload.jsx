import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modals/modal";

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

function ConsumerUpload({
  handlebizDataUpdate,
  bizdata,
  handlebizPutdataUpdate,
}) {
  //비즈니스 message 값 가져오려고 Ref 사용
  const messageRef = useRef();
  const navigate = useNavigate();

  //비즈니스 message 없이 등록해도, 예전의 message가 출력 될 수 있게 data 불러옴
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(bizdata);
  }, [bizdata]);

  useEffect(() => {
    handlebizDataUpdate(id);
  }, []);

  //upload 할 때 이미지 보여지게 할때
  const [images, setimages] = useState([]);

  //data 보관 용 이미지 state
  const [imgs, setimgs] = useState([]);

  //data 보관 용 문서 stat
  const [files, setfile] = useState([]);

  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    setsubmitModalOpen(false);
    const formData = new FormData();
    formData.append("uuid", id);

    formData.append(
      "businessMemo",
      messageRef.current.value || data.businessMemo
    );

    imgs.forEach((item) => formData.append("images", item));
    files.forEach((item) => formData.append("docs", item));

    console.log(handlebizPutdataUpdate);
    handlebizPutdataUpdate(formData, () => {
      navigate(`/${id}/confirm`);
    });
  };

  const handleimageDelete = (e) => {
    e.preventDefault();

    const index = e.currentTarget.value;

    const image = images.filter((item, index2) => {
      return index != index2;
    });

    const img = imgs.filter((item, index2) => {
      return index != index2;
    });

    console.log(img);

    setimages(image);
    setimgs(img);
  };

  const handleDocsDelete = (e) => {
    e.preventDefault();
    const index = e.target.value;

    const doc = files.filter((item, index2) => {
      return index != index2;
    });
    setfile(doc);
  };

  const handleFileUpload = (e) => {
    const docsFileArr = e.target.files;
    let docsfiles = [];
    let file;
    let filesLength = docsFileArr.length > 10 ? 10 : docsFileArr.length;
    for (let i = 0; i < filesLength; i++) {
      file = docsFileArr[i];
      docsfiles[i] = file;
      files.length === 0
        ? setfile([...docsfiles])
        : setfile(files.concat([...docsfiles]));
    }
    e.target.value = "";
  };

  const handleCaptureImageUpload = (e) => {
    e.preventDefault();
    let input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";
    input.multiple = "multiple";
    input.capture = "capture";
    input.click();
    input.onchange = function (e) {
      console.log(e);
      const imageFileArr = e.target.files;
      console.log(imageFileArr);
      let fileURLs = [];
      let imgfiles = [];
      let file;
      let filesLength = imageFileArr.length > 10 ? 10 : imageFileArr.length;
      for (let i = 0; i < filesLength; i++) {
        file = imageFileArr[i];
        imgfiles[i] = file;

        imgs.length === 0
          ? setimgs([...imgfiles])
          : setimgs(imgs.concat([...imgfiles]));
        // setimgs((imgs) => imgs.concat(imgfiles));
        let reader = new FileReader();
        reader.onload = () => {
          fileURLs[i] = reader.result;
          images.length === 0
            ? setimages([...fileURLs])
            : setimages(images.concat([...fileURLs]));

          // setimages((imgs) => imgs.concat(fileURLs));
        };
        reader.readAsDataURL(file);
      }
      e.target.value = "";
    };
    setimageModalOpen(false);
  };
  const handleGalleryImageUpload = (e) => {
    e.preventDefault();
    let input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";
    input.multiple = "multiple";

    input.click();
    input.onchange = function (e) {
      console.log(e);
      const imageFileArr = e.target.files;
      console.log(imageFileArr);
      let fileURLs = [];
      let imgfiles = [];
      let file;
      let filesLength = imageFileArr.length;
      for (let i = 0; i < filesLength; i++) {
        file = imageFileArr[i];
        imgfiles[i] = file;
        imgs.length === 0
          ? setimgs([...imgfiles])
          : setimgs(imgs.concat([...imgfiles]));
        // setimgs((imgs) => imgs.concat(imgfiles));
        let reader = new FileReader();
        reader.onload = () => {
          fileURLs[i] = reader.result;
          images.length === 0
            ? setimages([...fileURLs])
            : setimages(images.concat([...fileURLs]));
          // setimages((imgs) => imgs.concat(fileURLs));
        };
        reader.readAsDataURL(file);
      }
      e.target.value = "";
    };
    setimageModalOpen(false);
  };

  //modal 팝업 부분
  const [submitmodalOpen, setsubmitModalOpen] = useState(false);
  const [imagemodalOpen, setimageModalOpen] = useState(false);

  const handleSubmitOpenModal = (e) => {
    e.preventDefault();
    setsubmitModalOpen(true);
  };
  const handleSubmitCloseModal = () => {
    setsubmitModalOpen(false);
  };
  const handleImageOpenModal = (e) => {
    e.preventDefault();
    setimageModalOpen(true);
  };
  const handleImageCloseModal = () => {
    setimageModalOpen(false);
  };

  const handleExit = () => {
    setsubmitModalOpen(false);
  };

  return (
    <>
      <div className="bg-[url(bg.png)] max-h-screen">
        <div className="text-center bg-neutral-600  z-10 p-3  flex justify-between w-screen fixed ">
          <i
            className="xi-arrow-left text-white text-xl pl-2 cursor-pointer	"
            onClick={() => navigate(`/${id}`)}
          ></i>
          <span className=" text-white pt-px pr-6">업로드 하기</span>
          <div> </div>
        </div>
        <form>
          <div className="lg:grid-cols-2 xl:grid-cols-2 lg:min-h-[100vh] xl:min-h-[120vh]  xl:place-content-center py-16 px-5 ">
            <div className="bg-white p-4 rounded-md shadow-md my-5 min-h-[30vh]">
              <button
                className=" bg-neutral-500 text-white p-2 text-center rounded-md w-max  text-sm
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700
                "
                onClick={handleImageOpenModal}
              >
                <i className="xi-plus"> 이미지</i>
              </button>

              <Modal
                open={imagemodalOpen}
                close={handleImageCloseModal}
                head="이미지 업로드"
                notmain="notmain"
              >
                <div className="flex justify-end ">
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
              <div className="grid grid-cols-3 mt-[20px] w-full">
                {images.map((image, index) => (
                  <div className="grid ">
                    {/* <button
                      value={index}
                      onClick={handleimageDelete}
                      className="xi-close-square object-cover text-[30px] bg-white text-red-600 absolute mt-[-10px] ml-[-10px]  p-0 border-0"
                    ></button> */}
                    <DeleteButton value={index} onClick={handleimageDelete} />
                    <img
                      value={index}
                      src={image}
                      alt="이미지"
                      className=" p-1 object-cover h-[100%] w-[100%]"
                    ></img>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md my-5 min-h-[30vh]">
              <label
                for="file"
                className=" bg-neutral-500 text-white p-2 text-center rounded-md  text-sm
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700
                cursor-pointer"
              >
                <i className="xi-plus"> 문서</i>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />

              {files.map((file, index) => (
                <>
                  <div className="flex ">
                    <button
                      className="xi-close-circle-o text-[20px] text-red-600 pt-3 "
                      value={index}
                      onClick={handleDocsDelete}
                    ></button>

                    <li
                      key={file.name}
                      className="list-none pt-2 pl-2 mt-1 text-left"
                    >
                      {file.name}
                    </li>
                  </div>
                </>
              ))}
            </div>
            <div className="bg-white  p-4 rounded-md shadow-md ">
              <p className=" bg-neutral-500  text-white p-2 mb-2 rounded-md text-center text-sm">
                <i className="xi-pen"> 홍보문구</i>
              </p>
              <div className="w-full h-4/5">
                <textarea
                  className="block border pb-28 w-full h-full border-neutral-300 p-2"
                  ref={messageRef}
                ></textarea>
              </div>
            </div>
            <div className=" place-self-center flex justify-center">
              <button
                className=" bg-neutral-500 text-white p-3 m-5 rounded-md w-full
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700 col-span-3
                w-[20vh]
                lg:w-[30vh]
                xl:w-[40vh]
                "
                onClick={handleSubmitOpenModal}
              >
                등록하기
              </button>

              <Modal
                open={submitmodalOpen}
                close={handleSubmitCloseModal}
                header="각 항목을 등록하시겠습니까?"
                head="업로드 하기"
              >
                <div className="flex justify-end">
                  <div className="w-max px-1">
                    <button
                      className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-md w-full text-sm
                  hover:bg-neutral-700 hover:text-white
                  active:bg-neutral-500
                  focus:bg-neutral-700"
                      onClick={handleExit}
                    >
                      취소
                    </button>
                  </div>
                  <div className="w-max">
                    <button
                      className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-md w-full  text-sm
                  hover:bg-neutral-700 hover:text-white
                  active:bg-neutral-500
                  focus:bg-neutral-700"
                      onClick={handleSubmit}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ConsumerUpload;
