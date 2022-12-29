import React, { useCallback, useState, useEffect, memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConsumerMain from "./consumer/consumerMain/consumerMain.jsx";
import Consumererror from "./consumer/consumerMain/consumererror.jsx";
import ConsumerUpload from "./consumer/consumerUpload/consumerUpload.jsx";
import ConsumerConfirm from "./consumer/consumerConfirm/consumerConfirm.jsx";
import BcmanagerMain from "./bcmanager/bcmanagerMain/bcmanagerMain.jsx";
import BcmanagerSearch from "./bcmanager/bcmanagerSearch/bcmanagerSearch.jsx";

const App = memo(({ recentRequest, bizcontent }) => {
  const [recentRequestlist, setRecentRequestlist] = useState([]);
  const [infolist, setinfolist] = useState([]);
  const [bizdata, setdata] = useState([]);
  const [imgs, setimgs] = useState([]);
  const [docs, setdocs] = useState([]);
  const [errorcode, seterrorcode] = useState([]);
  const [errormessage, seterrormessage] = useState([]);

  useEffect(() => {
    recentRequest
      .recentrequest()
      .then((item) => setRecentRequestlist(item.data.result));
  }, []);

  const bizinfoApiUpdate = useCallback((uuid) => {
    (async () => {
      const result = await bizcontent
        .contentinfo(uuid)
        .catch((error) => console.log(error));
      setinfolist(result.data);
      seterrorcode(result.code);
      seterrormessage(result.message);
    })();
  }, []);

  const bizdataApiUpdate = useCallback((uuid) => {
    (async () => {
      const result = await bizcontent
        .contentdetail(uuid)
        .catch((error) => console.log(error));
      setdata(result.data);
      setimgs(Array.from(result.data.images));
      setdocs(Array.from(result.data.docs));
    })();
  }, []);

  const bizputdataApiUpdate = useCallback((formdata, callback, switchs) => {
    (async () => {
      const result = await bizcontent.contentput(formdata);
      if (callback) {
        callback();
      }
      if (switchs == "modify") {
        alert("수정 되었습니다");
      } else {
        alert("업로드 되었습니다");
      }
    })();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:id"
            element={
              <ConsumerMain
                handlebizInfoUpdate={bizinfoApiUpdate}
                handlebizDataUpdate={bizdataApiUpdate}
                infolist={infolist}
                bizdata={bizdata}
                errorcode={errorcode}
              />
            }
          ></Route>
          <Route
            path="/error"
            element={
              <Consumererror errormessage={errormessage}></Consumererror>
            }
          ></Route>
          <Route
            path="/upload/:id"
            element={
              <ConsumerUpload
                handlebizPutdataUpdate={bizputdataApiUpdate}
                handlebizDataUpdate={bizdataApiUpdate}
                bizdata={bizdata}
              />
            }
          ></Route>
          <Route
            path="/confirm/:id"
            element={
              <ConsumerConfirm
                handlebizDataUpdate={bizdataApiUpdate}
                bizdata={bizdata}
                dataimgs={imgs}
                datadocs={docs}
                handlebizPutdataUpdate={bizputdataApiUpdate}
              />
            }
          ></Route>
          <Route
            path="/manager/:id"
            element={<BcmanagerMain OnRecentRequest={recentRequestlist} />}
          ></Route>
          <Route
            path="/manager/search/:id"
            element={<BcmanagerSearch />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
});

export default App;
