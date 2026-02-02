// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8080/orchids",
  CATEGORY_URL: import.meta.env.VITE_CATEGORY_API_URL || "http://localhost:8080/categories",
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// Default values
export const DEFAULT_IMAGE_URL = "https://placehold.co/40x40";

// Toast messages
export const TOAST_MESSAGES = {
  ORCHID: {
    LOAD_SUCCESS: "Orchids loaded successfully!",
    LOAD_ERROR: "Load orchids failed!",
    ADD_SUCCESS: "Orchid added successfully!",
    ADD_ERROR: "Orchid added failed!",
    UPDATE_SUCCESS: "Orchid updated successfully!",
    UPDATE_ERROR: "Orchid update failed!",
    DELETE_SUCCESS: "Orchid deleted successfully!",
    DELETE_ERROR: "Orchid deleted failed!",
  },
  CATEGORY: {
    LOAD_SUCCESS: "Categories loaded successfully!",
    LOAD_ERROR: "Load categories failed!",
  },
};
