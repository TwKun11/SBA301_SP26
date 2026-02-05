import api from "./api";

const NewsArticleService = {
  getAllNewsArticles: async () => {
    const response = await api.get("/news");
    return response.data;
  },

  getActiveNewsArticles: async () => {
    const response = await api.get("/news/active");
    return response.data;
  },

  getNewsArticleById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  getNewsByCreator: async (creatorId) => {
    const response = await api.get(`/news/creator/${creatorId}`);
    return response.data;
  },

  searchActiveNews: async (keyword) => {
    const response = await api.get("/news/search/active", {
      params: { keyword },
    });
    return response.data;
  },

  searchAllNews: async (keyword) => {
    const response = await api.get("/news/search/all", {
      params: { keyword },
    });
    return response.data;
  },

  searchNewsByCreator: async (creatorId, keyword) => {
    const response = await api.get(`/news/search/creator/${creatorId}`, {
      params: { keyword },
    });
    return response.data;
  },

  createNewsArticle: async (newsData) => {
    const response = await api.post("/news", newsData);
    return response.data;
  },

  updateNewsArticle: async (id, newsData) => {
    const response = await api.put(`/news/${id}`, newsData);
    return response.data;
  },

  deleteNewsArticle: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};

export default NewsArticleService;
