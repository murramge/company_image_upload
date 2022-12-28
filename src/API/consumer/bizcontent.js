import axios from "axios";

class Bizcontent {
  constructor() {
    this.Bizcontent = axios.create({
      baseURL: `/api/bizContent/`,
    });
  }

  async contentinfo(uuid) {
    const response = await this.Bizcontent.get(`/info/${uuid}`);
    return response.data;
  }

  async contentdetail(id) {
    const response = await this.Bizcontent.post(`/contentDetail`, {
      uuid: id,
    });
    return response.data;
  }

  async contentput(formdata) {
    const response = await this.Bizcontent.post(`/putContent`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
}

export default Bizcontent;
