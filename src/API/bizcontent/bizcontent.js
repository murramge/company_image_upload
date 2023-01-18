import { API_AXIOS } from "../../const";

class Bizcontent {
  constructor() {
    this.Bizcontent = API_AXIOS;
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

  async contentdelete(id, fileid) {
    const response = await this.Bizcontent.delete(
      `/deleteFile/${id}/${fileid}`
    );
    return response;
  }

  async searchcompony(searchvalue) {
    const response = await this.Bizcontent.post(`/admin/searchCompany`, {
      topQty: 10,
      searchText: searchvalue,
    });
    return response.data;
  }

  async recentrequest(topQty) {
    const response = await this.Bizcontent.get(
      `/admin/recentRequestHistory/${topQty}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  }

  async recentupload(topQty) {
    const response = await this.Bizcontent.get(
      `/admin/recentUploadHistory/${topQty}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
}

export default Bizcontent;
