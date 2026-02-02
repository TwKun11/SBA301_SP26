import axios from "axios";
import { API_CONFIG } from "../constants";

/**
 * Orchid Service - Handle all orchid-related API calls
 */
class OrchidService {
  /**
   * Get all orchids
   */
  async getAllOrchids() {
    const response = await axios.get(API_CONFIG.BASE_URL);
    return response.data?.content ?? response.data ?? [];
  }

  /**
   * Get orchid by ID
   */
  async getOrchidById(id) {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Create new orchid
   */
  async createOrchid(orchidData) {
    const response = await axios.post(API_CONFIG.BASE_URL, orchidData, { headers: API_CONFIG.HEADERS });
    return response.data;
  }

  /**
   * Update orchid
   */
  async updateOrchid(id, orchidData) {
    const response = await axios.put(`${API_CONFIG.BASE_URL}/${id}`, orchidData, { headers: API_CONFIG.HEADERS });
    return response.data;
  }

  /**
   * Delete orchid
   */
  async deleteOrchid(id) {
    const response = await axios.delete(`${API_CONFIG.BASE_URL}/${id}`);
    return response.data;
  }
}

export default new OrchidService();
