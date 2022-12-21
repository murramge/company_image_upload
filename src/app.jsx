import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConsumerMain from "./consumer/consumerMain/consumerMain.jsx";
import ConsumerUpload from "./consumer/consumerUpload/consumerUpload.jsx";
import ConsumerConfirm from "./consumer/consumerConfirm/consumerConfirm.jsx";

function App(props) {
  let [datas, setDatas] = useState({
    1: {
      id: 1,
      uuid: "A3200007",
      businessMemo: "gogo",
      image: [],
      docs: [],
      imgfileId: "",
    },
  });

  console.log(datas);
  const onUpload = (data) => {
    setDatas((datas) => {
      {
        const updated = { ...datas };
        updated[data.id] = data;
        return updated;
      }
    });
  };
  const onDelete = (data) => {
    setDatas((datas) => {
      const updated = { ...datas };
      delete updated[data.id];
      return updated;
    });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<ConsumerMain />}></Route>
          <Route
            path="/upload/:id"
            element={
              <ConsumerUpload
                onUpload={onUpload}
                onUpdate={onUpload}
                data={datas}
                onDelete={onDelete}
              />
            }
          ></Route>
          <Route
            path="/confirm/:id"
            element={<ConsumerConfirm onUpdate={onUpload} datas={datas} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
