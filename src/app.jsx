import React, { useCallback, useState, useEffect, memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConsumerMain from "./consumer/consumerMain/consumerMain.jsx";
import ConsumerUpload from "./consumer/consumerUpload/consumerUpload.jsx";
import ConsumerConfirm from "./consumer/consumerConfirm/consumerConfirm.jsx";
import BcmanagerMain from "./bcmanager/bcmanagerMain/bcmanagerMain.jsx";
import BcmanagerSearch from "./bcmanager/bcmanagerSearch/bcmanagerSearch.jsx";

const App = memo(({ recentRequest, bizcontent }) => {
  const [recentRequestlist, setRecentRequestlist] = useState([]);
  const [infolist, setinfolist] = useState([]);
  const [station, setstation] = useState([]);
  const [imgs, setimgs] = useState([]);
  const [docs, setdocs] = useState([]);

  useEffect(() => {
    recentRequest
      .recentrequest()
      .then((item) => setRecentRequestlist(item.data.result));
  }, []);

  const bizinfo = useCallback((uuid) => {
    bizcontent.contentinfo(uuid).then((items) => setinfolist(items.data));
  }, []);

  const bizdetail = useCallback((uuid) => {
    (async () => {
      const result = await bizcontent
        .contentdetail(uuid)
        .catch((error) => console.log(error));
      setstation(result.data);
      setimgs(Array.from(result.data.images));
      setdocs(Array.from(result.data.docs));
    })();
  }, []);

  const bizput = useCallback((formdata) => {
    (async () => {
      const result = await bizcontent.contentput(formdata);
      console.log(result);
    })();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:id"
            element={<ConsumerMain Onbizinfo={bizinfo} infolist={infolist} />}
          ></Route>
          <Route
            path="/upload/:id"
            element={
              <ConsumerUpload
                Onbizput={bizput}
                Onbizdetail={bizdetail}
                Onstation={station}
              />
            }
          ></Route>
          <Route
            path="/confirm/:id"
            element={
              <ConsumerConfirm
                Onbizdetail={bizdetail}
                Onstation={station}
                Onimgs={imgs}
                Ondocs={docs}
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
