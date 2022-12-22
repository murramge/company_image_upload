import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConsumerMain from "./consumer/consumerMain/consumerMain.jsx";
import ConsumerUpload from "./consumer/consumerUpload/consumerUpload.jsx";
import ConsumerConfirm from "./consumer/consumerConfirm/consumerConfirm.jsx";

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<ConsumerMain />}></Route>
          <Route path="/upload/:id" element={<ConsumerUpload />}></Route>
          <Route path="/confirm/:id" element={<ConsumerConfirm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
