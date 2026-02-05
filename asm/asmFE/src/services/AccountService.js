import api from "./api";

const AccountService = {
  getAllAccounts: async () => {
    const response = await api.get("/accounts");
    return response.data;
  },

  getAccountById: async (id) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  searchAccounts: async (keyword) => {
    const response = await api.get("/accounts/search", {
      params: { keyword },
    });
    return response.data;
  },

  createAccount: async (accountData) => {
    const response = await api.post("/accounts", accountData);
    return response.data;
  },

  updateAccount: async (id, accountData) => {
    const response = await api.put(`/accounts/${id}`, accountData);
    return response.data;
  },

  deleteAccount: async (id) => {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/accounts/login", credentials);
    return response.data;
  },
};

export default AccountService;
