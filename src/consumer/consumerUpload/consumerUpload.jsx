import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modals/modal";

function ConsumerUpload(props) {
  const messageRef = useRef();

  const navigate = useNavigate();

  const [files, setfile] = useState([]);

  const [images, setimages] = useState([]);
  const [datas, setData] = useState();
  const [idx, setindex] = useState();

  const [imgs, setimgs] = useState([]);

  const { id } = useParams();

  var formData = new FormData();
  formData.append("uuid", "A3200007");

  const handleSubmit = (event) => {
    event.preventDefault();
    const { onUpload } = props;
    const data = {
      ide: Date.now,
      message: messageRef.current.value || " ",
      image: images.map((image) => image) || " ",
      docs: files.map((file) => file) || " ",
    };
    setData(data);
    onUpload(data);

    formData.append("businessMemo", data.message);

    for (let i = 0; i < imgs.length; i++) {
      formData.append("images", imgs[i]);
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("docs", data.docs[i]);
    }

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
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
      })
      .catch((error) => {
        console.log("failed", error);
      });

    navigate(`/${id}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const index = e.target.value;
    setindex(index);
    images.splice(index, 1);
    imgs.splice(index, 1);
    console.log(imgs);
    console.log(images);
    setimages(images);
    return images;
  };

  const handleFileChange = (e) => {
    setfile(Array.from(e.target.files || []));
  };

  // const handleImageChange = (e) => {
  //   const imagechange = e.target.files;
  //   console.log(imagechange[0]);
  //   setimgs(imagechange[0]);
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(e.target.files[0]);
  //   fileReader.onload = function (e) {
  //     setimages(e.target.result);
  //   };
  // };

  const handleImageChange = (e) => {
    const imageFileArr = e.target.files;
    console.log(imageFileArr);
    setimgs(Array.from(e.target.files || []));

    let fileURLs = [];
    let file;
    let filesLength = imageFileArr.length > 10 ? 10 : imageFileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = imageFileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setimages([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };
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
      <div className="text-center p-3 bg-slate-500">
        <span className="text-center text-white">업로드 하기</span>
      </div>

      <div className="bg-slate-200 min-h-screen">
        <form>
          <div className=" grid grid-rows-3 gap-10  lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center py-5 px-5 ">
            <div className="bg-white sm:bg-white md:bg-white lg:bg-white xl:bg-white 2xl:bg-white p-4 rounded-3xl shadow-xl">
              <button
                className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700
                "
                onClick={imageopenModal}
              >
                + 이미지
              </button>

              <Modal
                open={imagemodalOpen}
                close={imagecloseModal}
                header="작업 선택"
              >
                <label
                  for="captureimage"
                  className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700
                "
                >
                  카메라 촬영
                </label>
                <label
                  for="galleryimage"
                  className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700
                "
                >
                  갤러리 선택
                </label>
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
              <div>
                {images.map((image, index) => (
                  <>
                    <button value={index} onClick={handleDelete}>
                      ❌
                    </button>

                    <img value={index} src={image}></img>
                  </>
                ))}
              </div>
            </div>
            <div className="bg-white sm:bg-white md:bg-white lg:bg-orange-400 xl:bg-purple-300 2xl:bg-amber-300 p-4 rounded-3xl shadow-xl ">
              <label
                for="file"
                className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700"
              >
                + 문서
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
                  <li key={file.name}> {file.name}</li>
                ))}
              </div>
            </div>
            <div className="bg-white sm:bg-white md:bg-white lg:bg-orange-400 xl:bg-purple-300 2xl:bg-amber-300 p-4 rounded-3xl shadow-xl ">
              <div className=" bg-blue-500 p-2 text-center rounded-xl  mx-auto text-sm">
                <p className="text-white">홍보 문구</p>
                <textarea
                  className="block border mt-5 w-full h-24 border-slate-400"
                  ref={messageRef}
                ></textarea>
              </div>
            </div>
          </div>
          <div className=" m-5 h-max">
            <div className="flex justify-center">
              <button
                className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700
                "
                onClick={submitopenModal}
              >
                등록하기
              </button>

              <Modal
                open={submitmodalOpen}
                close={submitcloseModal}
                header="각 항목을 등록하시겠습니까?"
              >
                <button
                  className=" bg-blue-500 text-white p-3 text-center sm:text-center lg:text-center xl:text-center rounded-xl w-3/4 mx-auto 
            hover:bg-blue-700 hover:text-white
            active:bg-blue-500
            focus:bg-blue-700"
                  onClick={handleExit}
                >
                  취소
                </button>
                <button
                  className=" bg-blue-500 text-white p-3 text-center sm:text-center lg:text-center xl:text-center rounded-xl w-3/4 mx-auto 
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700"
                  onClick={handleSubmit}
                >
                  확인
                </button>
              </Modal>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ConsumerUpload;
