import axios from "axios";
import MOCK_DATA from "../MOCK_DATA.json";

class Searchcompany {
  constructor() {
    this.Searchcompany = axios.create({
      baseURL: `http://115.89.138.200:8082/api/bizContent`,
    });
  }

  async searchcompony(searchvalue) {
    const response = await this.Searchcompany.post(`/searchCompany`, {
      topQty: 10,
      searchText: searchvalue,
    });
    return response.data;
  }

  // async searchcompony(searchvalue) {
  //   await new Promise((r) => setTimeout(r, 200));

  //   const mockData = MOCK_DATA.filter((item) => {
  //     return (
  //       item.main_phonenumber === searchvalue ||
  //       item.company_name.indexOf(searchvalue) >= 0
  //     );
  //   });

  //   return {
  //     code: 0,
  //     message: null,
  //     data: {
  //       total: mockData.length,
  //       result: mockData,
  //     },
  //   };
  // }
}

export default Searchcompany;
