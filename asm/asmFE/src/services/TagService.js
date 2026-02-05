import axios from "axios";

const API_URL = "http://localhost:8080/api/tags";

const TagService = {
  getAllTags: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTagById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createTag: async (tagData) => {
    const response = await axios.post(API_URL, tagData);
    return response.data;
  },

  updateTag: async (id, tagData) => {
    const response = await axios.put(`${API_URL}/${id}`, tagData);
    return response.data;
  },

  deleteTag: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  searchTags: async (keyword) => {
    const response = await axios.get(`${API_URL}/search?keyword=${keyword}`);
    return response.data;
  },
};

export default TagService;
