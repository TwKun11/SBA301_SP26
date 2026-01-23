import apiClient from "../api/apiClient";

const ENDPOINT = "/orchids";

const orchidService = {
  // Get all orchids
  getAll: async () => {
    const response = await apiClient.get(ENDPOINT);
    return response.data;
  },

  // Get orchid by ID
  getById: async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/${id}`);
    return response.data;
  },

  // Create new orchid
  create: async (data) => {
    const response = await apiClient.post(ENDPOINT, data);
    return response.data;
  },

  // Update orchid
  update: async (id, data) => {
    const response = await apiClient.put(`${ENDPOINT}/${id}`, data);
    return response.data;
  },

  // Partial update
  patch: async (id, data) => {
    const response = await apiClient.patch(`${ENDPOINT}/${id}`, data);
    return response.data;
  },

  // Delete orchid
  delete: async (id) => {
    const response = await apiClient.delete(`${ENDPOINT}/${id}`);
    return response.data;
  },

  // Search with query
  search: async (query) => {
    const response = await apiClient.get(ENDPOINT, {
      params: { q: query },
    });
    return response.data;
  },

  // Filter by field
  filterBy: async (field, value) => {
    const response = await apiClient.get(ENDPOINT, {
      params: { [field]: value },
    });
    return response.data;
  },

  // Sort
  sort: async (sortBy = "id", order = "asc") => {
    const response = await apiClient.get(ENDPOINT, {
      params: { _sort: sortBy, _order: order },
    });
    return response.data;
  },

  // Paginate
  paginate: async (page = 1, limit = 10) => {
    const response = await apiClient.get(ENDPOINT, {
      params: { _page: page, _limit: limit },
    });
    return {
      data: response.data,
      total: response.headers["x-total-count"],
    };
  },
};

// Alias methods cho dễ sử dụng
orchidService.getAllOrchids = orchidService.getAll;
orchidService.getOrchidById = orchidService.getById;
orchidService.createOrchid = orchidService.create;
orchidService.updateOrchid = orchidService.update;
orchidService.deleteOrchid = orchidService.delete;

// Methods đặc thù cho orchids
orchidService.getSpecialOrchids = () => orchidService.filterBy("isSpecial", true);
orchidService.getOrchidsByCategory = (category) => orchidService.filterBy("category", category);

export default orchidService;
