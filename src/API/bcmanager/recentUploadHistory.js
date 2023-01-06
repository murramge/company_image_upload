import axios from "axios";
import MOCK_DATA from "../MOCK_DATA.json";

class RecentUploadHistory {
  constructor(topQty) {
    this.RecentUploadHistory = axios.create({
      baseURL: `/api/bizContent/recentUploadHistory/${topQty}`,
    });
    this.topQty = topQty;
  }

  async recentupload() {
    const response = await this.RecentUploadHistory.get();
    return response.data;
  }

  // async recentupload() {
  //   let mockData = [...MOCK_DATA];
  //   mockData = mockData.sort(
  //     (a, b) => new Date(b.action_dtime) - new Date(a.action_dtime)
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

export default RecentUploadHistory;
