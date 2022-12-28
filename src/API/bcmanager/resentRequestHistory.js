import axios from "axios";

class RecentRequestHistory {
  constructor(topQty) {
    this.RecentRequestHistory = axios.create({
      baseURL: `/api/bizContent/recentRequestHistory/${topQty}`,
    });
  }

  async recentrequest() {
    const response = await this.RecentRequestHistory.get();
    return response.data;
  }
}

export default RecentRequestHistory;
