import axios from "axios";
import { API_CONFIG } from "../constants";

/**
 * Category Service - Handle all category-related API calls
 */
class CategoryService {
  /**
   * Get all categories
   */
  async getAllCategories() {
    const response = await axios.get(API_CONFIG.CATEGORY_URL);
    return response.data;
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id) {
    const response = await axios.get(`${API_CONFIG.CATEGORY_URL}/${id}`);
    return response.data;
  }

  /**
   * Create new category
   */
  async createCategory(categoryData) {
    const response = await axios.post(API_CONFIG.CATEGORY_URL, categoryData, { headers: API_CONFIG.HEADERS });
    return response.data;
  }

  /**
   * Update category
   */
  async updateCategory(id, categoryData) {
    const response = await axios.put(`${API_CONFIG.CATEGORY_URL}/${id}`, categoryData, { headers: API_CONFIG.HEADERS });
    return response.data;
  }

  /**
   * Delete category
   */
  async deleteCategory(id) {
    const response = await axios.delete(`${API_CONFIG.CATEGORY_URL}/${id}`);
    return response.data;
  }
}

export default new CategoryService();
