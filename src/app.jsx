import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConsumerMain from "./consumer/consumerMain/consumerMain.jsx";
import ConsumerUpload from "./consumer/consumerUpload/consumerUpload.jsx";
import ConsumerConfirm from "./consumer/consumerConfirm/consumerConfirm.jsx";

function App(props) {
  let [datas, setDatas] = useState({
    1: {
      ide: 1,
      message: "gogo",
      image: [],
    },
  });

  console.log(datas);
  const onUpload = (data) => {
    setDatas((datas) => {
      {
        const updated = { ...datas };
        updated[data.ide] = data;
        return updated;
      }
    });
  };
  const onDelete = (data) => {
    setDatas((datas) => {
      const updated = { ...datas };
      delete updated[data.ide];
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
            element={<ConsumerUpload onUpload={onUpload} onDelete={onDelete} />}
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
