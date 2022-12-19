import axios from "axios";
axios.defaults.withCredentials = true;

const config = {
  method: "get",
  url: "http://115.89.138.200:8081/api/bizContent/info/A3200007",
  headers: {},
};

const bizinfo = axios
  .get(
    "http://115.89.138.200:8081/api/bizContent/info/A3200007",
    {},
    {
      withCredentials: true,
    }
  )
  .then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    return error;
  });

export default bizinfo;
