import axios from "axios";

class RecentUploadHistory {
  constructor(topQty) {
    this.RecentUploadHistory = axios.create({
      baseURL: `/api/bizContent/recentUploadHistory/${topQty}`,
    });
  }

  async recentupload() {
    const response = await this.RecentUploadHistory.get();
    return response.data;
  }
}

export default RecentUploadHistory;
