import React, {
  useCallback,
  useState,
  useEffect,
  memo,
  useContext,
} from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import ConsumerMain from "./consumer/consumerMain/consumerMain.jsx";
import Consumererror from "./consumer/consumerMain/consumererror.jsx";
import ConsumerUpload from "./consumer/consumerUpload/consumerUpload.jsx";
import ConsumerConfirm from "./consumer/consumerConfirm/consumerConfirm.jsx";
import BcmanagerMain from "./bcmanager/bcmanagerMain/bcmanagerMain.jsx";
import BcmanagerSearch from "./bcmanager/bcmanagerSearch/bcmanagerSearch.jsx";
import BcmanagerView from "./bcmanager/bcmanagerView/bcmanagerView.jsx";

const App = memo(({ bizcontent, infoList }) => {
  const [infolist, setinfolist] = useState(infoList);
  const [bizdata, setdata] = useState([]);
  const [imgs, setimgs] = useState([]);
  const [docs, setdocs] = useState([]);
  const [errorcode, seterrorcode] = useState([]);
  const { setErrorMessage } = useContext(ErrorContext);

  const bizinfoApiUpdate = useCallback((uuid) => {
    (async () => {
      const result = await bizcontent
        .contentinfo(uuid)
        .catch((error) => console.log(error));
      setinfolist(result.data);
      seterrorcode(result.code);
      setErrorMessage(result.message);
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
      <Routes>
        <Route
          path=""
          element={
            <ConsumerMain
              handlebizInfoUpdate={bizinfoApiUpdate}
              handlebizDataUpdate={bizdataApiUpdate}
              infolist={infolist}
              bizdata={bizdata}
              errorcode={errorcode}
            ></ConsumerMain>
          }
        />

        <Route
          path="/upload"
          element={
            <ConsumerUpload
              handlebizPutdataUpdate={bizputdataApiUpdate}
              handlebizDataUpdate={bizdataApiUpdate}
              bizdata={bizdata}
            />
          }
        ></Route>
        <Route
          path="/confirm"
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
      </Routes>
    </>
  );
});

const UploadAppLoader = (props) => {
  const [infoList, setInfoList] = useState();
  const { id } = useParams();
  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    (async () => {
      const result = await props.bizcontent
        .contentinfo(id)
        .catch((error) => console.log(error));

      if (result.message) {
        setErrorMessage(result.message);
        return;
      }
      setInfoList(result.data);
    })();
  }, []);

  return <>{infoList && <App {...props} infoList={infoList} />}</>;
};

const ErrorContext = React.createContext();

function ManagerRouter(props) {
  const { recentRequest, recentUpload, searchCompany } = props;

  const [recentRequestlist, setRecentRequestlist] = useState([]);
  const [recentUploadlist, setRecentUploadlist] = useState([]);
  const [searchlist, setSearchlist] = useState([]);
  useEffect(() => {
    recentRequest
      .recentrequest()
      .then((item) => setRecentRequestlist(item.data.result));
  }, []);

  useEffect(() => {
    recentUpload
      .recentupload()
      .then((item) => setRecentUploadlist(item.data.result));
  });
  const bizdataSearchCompony = useCallback((searchvalue) => {
    (async () => {
      const result = await searchCompany
        .searchcompony(searchvalue)
        .catch((error) => console.log(error));
      setSearchlist(result.data.result);
      console.log(result.data.result);
    })();
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          <BcmanagerMain
            recentRequestList={recentRequestlist}
            recentUploadList={recentUploadlist}
          />
        }
      ></Route>
      <Route
        path="/search"
        element={
          <BcmanagerSearch
            bizdataSearchCompont={bizdataSearchCompony}
            searchlist={searchlist}
          />
        }
      ></Route>
      <Route path="/view/:id" element={BcmanagerView}></Route>
    </Routes>
  );
}

function MainRouter(props) {
  const [errormessage, setErrorMessage] = useState();

  return (
    <>
      {errormessage && (
        <Consumererror errormessage={errormessage}></Consumererror>
      )}
      {!errormessage && (
        <BrowserRouter>
          <ErrorContext.Provider value={{ setErrorMessage }}>
            <Routes>
              <Route
                path="/manager/*"
                element={<ManagerRouter {...props} />}
              ></Route>
              <Route
                path="/:id/*"
                element={<UploadAppLoader {...props} />}
              ></Route>
            </Routes>
          </ErrorContext.Provider>
        </BrowserRouter>
      )}
    </>
  );
}

export default MainRouter;
