import React, { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function ConsumerUpload(props) {
  const messageRef = useRef();

  const navigate = useNavigate();

  const [files, setfile] = useState([]);

  const [images, setimages] = useState([]);
  const [datas, setData] = useState();

  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { onUpload } = props;
    const data = {
      id: Date.now,
      message: messageRef.current.value || " ",
      image: images.map((image) => image) || " ",
    };
    setData(data);
    onUpload(data);

    navigate(`/${id}`);
  };

  console.log(datas);
  const handleDelete = () => {
    const { onDelete } = props;
    onDelete(datas);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
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

  return (
    <>
      <div className="text-center p-3 bg-slate-500">
        <span className="text-center text-white">업로드 하기</span>
      </div>

      <div className="bg-slate-200 min-h-screen">
        <form>
          <div className=" grid grid-rows-3 gap-10  lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center py-5 px-5 ">
            <div className="bg-white sm:bg-white md:bg-white lg:bg-white xl:bg-white 2xl:bg-white p-4 rounded-3xl shadow-xl">
              <label
                for="image"
                className=" bg-blue-500 text-white p-2 text-center rounded-xl w-13 mx-auto text-sm
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700
                "
              >
                + 이미지
              </label>
              <input
                type="file"
                name="image"
                id="image"
                multiple
                accept="image/*"
                capture="camera"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <div>
                {images.map((image) => (
                  <>
                    <button name="Delete" onClick={handleDelete}>
                      ❌
                    </button>
                    <img key={image} src={image}></img>
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
                className=" bg-blue-500 text-white p-3 text-center sm:text-center lg:text-center xl:text-center rounded-xl w-3/4 mx-auto 
                hover:bg-blue-700 hover:text-white
                active:bg-blue-500
                focus:bg-blue-700"
                onClick={handleSubmit}
              >
                등록 하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ConsumerUpload;
