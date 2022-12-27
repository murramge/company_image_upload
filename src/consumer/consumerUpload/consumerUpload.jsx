import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modals/modal";

function ConsumerUpload(props) {
  //message 값 가져오려고 Ref 사용
  const messageRef = useRef();
  const navigate = useNavigate();

  const [station, setstation] = useState([]);

  //upload 할 때 이미지 보여지게 할때
  const [images, setimages] = useState([]);

  //data 보관 용 이미지 state
  const [imgs, setimgs] = useState([]);

  //data 보관 용 문서 stat
  const [files, setfile] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .post(
        "/api/bizContent/contentDetail",
        {
          uuid: id,
        },
        {}
      )
      .then((response) => response.data)
      .then((item) => setstation(item.data))
      .catch((error) => console.log(error));
  }, []);

  const formData = new FormData();
  formData.append("uuid", id);

  const handleSubmit = (event) => {
    event.preventDefault();

    formData.append(
      "businessMemo",
      messageRef.current.value || station.businessMemo
    );

    for (let i = 0; i < imgs.length; i++) {
      formData.append("images", imgs[i]);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("docs", files[i]);
    }

    axios
      .post("/api/bizContent/putContent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
        console.log(response.data);
        navigate(`/confirm/${id}`);
      })
      .catch((error) => {
        console.log("failed", error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const index = e.target.value;

    const image = images.filter((item, index2) => {
      return index != index2;
    });

    const img = imgs.filter((item, index2) => {
      return index != index2;
    });

    console.log(image);
    console.log(img);
    setimages(image);
    setimgs(img);

    return images;
  };

  const handleFileChange = (e) => {
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

  const handleImageChange = (e) => {
    const imageFileArr = e.target.files;
    let fileURLs = [];
    let imgfiles = [];
    let file;
    let filesLength = imageFileArr.length > 10 ? 10 : imageFileArr.length;
    for (let i = 0; i < filesLength; i++) {
      file = imageFileArr[i];
      imgfiles[i] = file;

      imgs.length === 0
        ? setimgs([...imgfiles] || [])
        : setimgs(imgs.concat([...imgfiles]));
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        images.length === 0
          ? setimages([...fileURLs])
          : setimages(images.concat([...fileURLs]));
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  //modal 팝업 부분
  const [submitmodalOpen, setsubmitModalOpen] = useState(false);
  const [imagemodalOpen, setimageModalOpen] = useState(false);

  const submitopenModal = (e) => {
    e.preventDefault();
    setsubmitModalOpen(true);
  };
  const submitcloseModal = () => {
    setsubmitModalOpen(false);
  };
  const imageopenModal = (e) => {
    e.preventDefault();
    setimageModalOpen(true);
  };
  const imagecloseModal = () => {
    setimageModalOpen(false);
  };

  const handleExit = () => {
    setsubmitModalOpen(false);
  };

  return (
    <>
      <div className="bg-[url(bg.png)] max-h-screen">
        <div className="text-center bg-neutral-600  p-2 flex justify-between w-full fixed ">
          <i
            className="xi-arrow-left text-white text-xl pl-2 cursor-pointer	"
            onClick={() => navigate(-1)}
          ></i>
          <span className=" text-white pt-px">업로드 하기</span>
          <div> </div>
        </div>
        <form>
          <div className=" grid grid-rows-3 gap-10 lg:grid-cols-2 xl:grid-cols-2 lg:min-h-[100vh] xl:min-h-[120vh]  xl:place-content-center py-16 px-5 ">
            <div className="bg-white p-4 rounded-3xl shadow-xl ">
              <button
                className=" bg-neutral-500 text-white p-2 text-center rounded-xl w-max mx-auto text-sm
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700
                "
                onClick={imageopenModal}
              >
                <i className="xi-plus"> 이미지</i>
              </button>

              <Modal
                open={imagemodalOpen}
                close={imagecloseModal}
                header="작업을 선택하세요"
                head="이미지 업로드"
              >
                <div className="flex justify-end">
                  <label
                    for="captureimage"
                    className=" bg-neutral-500 text-white p-2 text-center rounded-xl w-max mx-1 text-sm
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700
                cursor-pointer
                "
                  >
                    <span> 카메라 촬영</span>
                  </label>
                  <label
                    for="galleryimage"
                    className=" bg-neutral-500 text-white p-2 text-center rounded-xl w-max text-sm
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700
                cursor-pointer
                "
                  >
                    <span> 이미지 선택</span>
                  </label>
                </div>
              </Modal>

              <input
                type="file"
                name="captureimage"
                id="captureimage"
                multiple
                accept="image/*"
                capture="camera"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <input
                type="file"
                name="galleryimage"
                id="galleryimage"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <div className="grid grid-cols-3">
                {images.map((image, index) => (
                  <div className="grid">
                    <button
                      value={index}
                      onClick={handleDelete}
                      className="xi-close-square text-[30px] text-red-600 absolute"
                    ></button>

                    <img
                      value={index}
                      src={image}
                      className="rounded-xl p-1"
                    ></img>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-xl ">
              <label
                for="file"
                className=" bg-neutral-500 text-white p-2 text-center rounded-xl w-max mx-auto text-sm
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
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div>
                {files.map((file) => (
                  <li key={file.name} className="list-none pt-2 mt-1">
                    {" "}
                    {file.name}
                  </li>
                ))}
              </div>
            </div>
            <div className="bg-white  p-4 rounded-3xl shadow-xl ">
              <p className="bg-neutral-500 text-white p-2 mb-2 rounded-xl w-max text-sm">
                <i className="xi-pen"> 홍보문구</i>
              </p>
              <div className="w-full h-4/5">
                <textarea
                  className="block border pb-10 w-full h-4/5 border-neutral-300"
                  ref={messageRef}
                ></textarea>
              </div>
            </div>
            <div className=" place-self-center">
              <button
                className=" bg-neutral-500 text-white p-3 m-5 rounded-xl w-full
                hover:bg-neutral-700 hover:text-white
                active:bg-neutral-500
                focus:bg-neutral-700 col-span-3
                w-[20vh]
                lg:w-[30vh]
                xl:w-[40vh]
                "
                onClick={submitopenModal}
              >
                등록하기
              </button>

              <Modal
                open={submitmodalOpen}
                close={submitcloseModal}
                header="각 항목을 등록하시겠습니까?"
                head="업로드 하기"
              >
                <div className="flex justify-end">
                  <div className="w-max px-1">
                    <button
                      className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-xl w-full text-sm
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
                      className=" bg-neutral-500 text-white p-2 m-1 text-center rounded-xl w-full  text-sm
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
