import axios from "axios";
import MOCK_DATA from "../MOCK_DATA.json";

class RecentRequestHistory {
  constructor(topQty) {
    this.RecentRequestHistory = axios.create({
      baseURL: `http://115.89.138.200:8082/api/bizContent/recentRequestHistory/${topQty}`,
    });
    this.topQty = topQty;
  }

  async recentrequest() {
    const response = await this.RecentRequestHistory.get();
    return response.data;
  }

  // async recentrequest() {
  //   let mockData = [...MOCK_DATA];
  //   mockData = mockData.sort(
  //     (a, b) => new Date(b.expired_date) - new Date(a.expired_date)
  //   );
  //   const mockList = mockData.slice(0, this.topQty);

  //   return {
  //     code: 0,
  //     message: null,
  //     data: {
  //       total: mockList.length,
  //       result: mockList,
  //     },
  //   };
  // }
}

export default RecentRequestHistory;
