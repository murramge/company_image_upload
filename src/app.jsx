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
import BcmanagerLogin from "./bcmanager/bcmanagerLogin/bcmanagerLogin.jsx";
import Loding from "./consumer/loding/loding.jsx";

const App = memo(({ bizcontent, infoList, auth }) => {
  const [infolist, setinfolist] = useState(infoList);
  const [bizdata, setdata] = useState([]);
  const [imgs, setimgs] = useState([]);
  const [docs, setdocs] = useState([]);
  const [errorcode, seterrorcode] = useState([]);
  const [lode, setlode] = useState(false);
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
      setlode(true);
      const result = await bizcontent.contentput(formdata);
      setlode(false);
      console.log(result);
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

  const bizdataApiDelete = useCallback((uuid, fileid, callback) => {
    (async () => {
      const result = await bizcontent.contentdelete(uuid, fileid);
      console.log(result);
      if (callback) {
        callback();
      }
    })();
  }, []);

  return (
    <>
      {lode ? <Loding /> : null}
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
              dataimgs={imgs}
              handlebizDataDelete={bizdataApiDelete}
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
              handlebizDataDelete={bizdataApiDelete}
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
  const { auth } = props;
  const [recentRequestlist, setRecentRequestlist] = useState([]);
  const [recentUploadlist, setRecentUploadlist] = useState([]);
  const [searchlist, setSearchlist] = useState([]);
  const [nonexistcompany, setNonExistCompany] = useState();
  const [bizdata, setdata] = useState([]);
  const [imgs, setimgs] = useState([]);
  const [docs, setdocs] = useState([]);
  const [accToken, setaccToken] = useState();
  const [refToken, setrefToken] = useState();

  const bizdatadetail = useCallback((id) => {
    (async () => {
      const result = await props.bizcontent
        .contentdetail(id)
        .catch((error) => setdata(error));
      setdata(result.data);
      if (result.data) {
        setimgs(Array.from(result.data.images));
        setdocs(Array.from(result.data.docs));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await props.bizcontent
        .recentrequest(10)
        .catch((error) => console.log(error));
      const data = result.data.result;
      setRecentRequestlist(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await props.bizcontent
        .recentupload(10)
        .catch((error) => console.log(error));
      const data = result.data.result;
      setRecentUploadlist(data);
    })();
  }, []);

  const bizdataSearchCompony = useCallback((searchvalue) => {
    (async () => {
      const result = await props.bizcontent
        .searchcompony(searchvalue)
        .catch((error) => console.log(error));
      const data = result.data.result;
      setSearchlist(data);
      const nonexistdata = data.length == 0 && "존재하지 않는 업체입니다.";
      setNonExistCompany(nonexistdata);
    })();
  }, []);

  const loginauth = useCallback((companyCode, password) => {
    (async () => {
      const result = await auth
        .loginauth(companyCode, password)
        .catch((error) => console.log(error));
      const data = JSON.parse(result.request.response);
      console.log(data);
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
            accToken={accToken}
            refToken={refToken}
          />
        }
      ></Route>
      <Route
        path="/search"
        element={
          <BcmanagerSearch
            bizdataSearchCompont={bizdataSearchCompony}
            searchlist={searchlist}
            nonexistcompany={nonexistcompany}
          />
        }
      ></Route>
      <Route
        path="/login"
        element={<BcmanagerLogin loginauth={loginauth} />}
      ></Route>
      <Route
        path="/view/:id"
        element={
          <BcmanagerView
            recentRequestList={recentRequestlist}
            bizdatadetail={bizdatadetail}
            bizdata={bizdata}
            dataimgs={imgs}
            datadocs={docs}
            refreshPage={true}
          ></BcmanagerView>
        }
      ></Route>
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
