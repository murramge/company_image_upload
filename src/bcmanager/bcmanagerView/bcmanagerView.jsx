import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BcmanagerInfoBar from "../bcmanagerBar/bcmanagerInfoBar";
import BcmanagerHeader from "../bcmanagerHeader/bcmanagerHeader";
import axios from "axios";

function BcmanagerView({
  recentRequestList,
  bizdatadetail,
  bizdata,
  dataimgs,
  datadocs,
}) {
  const { id } = useParams();
  const data = recentRequestList.filter((item) => item.uuid == id);

  const [datas, setdata] = useState([]);
  const [imgs, setimgs] = useState([]);
  const [docs, setdocs] = useState([]);

  console.log(datas);

  useEffect(() => {
    bizdatadetail(id);
  }, []);

  useEffect(() => {
    setdata(bizdata);
    setimgs(dataimgs);
    setdocs(datadocs);
  }, [bizdata || dataimgs || datadocs]);

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

  const handleClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      alert("클립보드에 복사가 완료되었습니다.");
    } catch (error) {
      alert("복사를 실패하였습니다.");
    }
  };

  return (
    <>
      <div className="flex">
        <div className="bg-slate-200 border-r-2 border-slate-300 ">
          <div>
            <BcmanagerHeader></BcmanagerHeader>
          </div>
          <div>
            <BcmanagerInfoBar
              companyData={data}
              companyAll={recentRequestList}
            />
          </div>
        </div>
        <div className="w-full bg-slate-200">
          <div className="h-14 bg-sky-700"> </div>
          <div className="h-8 bg-slate-700 text-white px-2 pt-1">
            업체 상세페이지
          </div>
          <div>
            <p className="text-[18px] py-3 bg-slate-100 shadow-md border-y border-slate-400 px-5 font-bold">
              이미지
            </p>
            <div className="min-h-[15vh]">
              {imgs.length !== 0 ? (
                <div className=" overflow-x-scroll">
                  <div className="flex">
                    {imgs
                      .map((image) => image.fileStorageId)
                      .map((image) => (
                        <img
                          value={image}
                          src={`/api/bizContent/preview/${image}`}
                          className=" p-1 object-cover h-[100%] w-[100%] h-[300px] w-[400px]"
                        ></img>
                      ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center pt-12"> 이미지가 없습니다.</p>
                </div>
              )}
            </div>
            <p className="text-[18px] py-3 bg-slate-100 shadow-md border-y border-slate-400 px-5 font-bold">
              문서
            </p>
            <div className="min-h-[15vh]">
              {docs.length !== 0 ? (
                <div>
                  <div className=" bg-gray-50 border">
                    {docs
                      .map((doc) => doc.fileStorageId)
                      .map((item, index) => (
                        <div
                          className={`${
                            index % 2 == 0 ? " bg-gray-100 " : "bg-white "
                          }`}
                        >
                          <button
                            value={item}
                            onClick={handleDocsDownload}
                            className="text-blue-500
                      active:text-violet-700
                      focus:text-violet-700
                    "
                          >
                            <li className="list-none p-1 pl-4 py-2 text-left ">
                              {docs[index].originalFilename}
                            </li>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center pt-12"> 문서가 없습니다.</p>
                </div>
              )}
            </div>
            <p className="text-[18px] py-3 bg-slate-100 shadow-md border-y border-slate-400 px-5 font-bold">
              홍보문구
            </p>
            <div className="min-h-[15vh] ">
              {datas ? (
                <>
                  <div className=" min-h-[15vh] rounded-md shadow-md bg-gray-50 p-10">
                    <p>
                      {datas.businessMemo}{" "}
                      <button
                        onClick={() => handleClipBoard(datas.businessMemo)}
                        className="xi-library-books-o text-[20px] text-slate-600"
                      ></button>
                    </p>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-center pt-12"> 홍보문구가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BcmanagerView;
