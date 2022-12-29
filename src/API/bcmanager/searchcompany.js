import axios from "axios";

class Searchcompany {
  constructor() {
    this.Searchcompany = axios.create({
      baseURL: `/api/bizContent`,
    });
  }

  async searchcompony(searchvalue) {
    const response = await this.Searchcompany.post(`/searchCompany`, {
      topQty: 10,
      searchText: searchvalue,
    });
    return response.data;
  }
}

export default Searchcompany;
