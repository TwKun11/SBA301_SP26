import { DEFAULT_IMAGE_URL } from "../constants";

/**
 * Get orchid ID (handle different response formats)
 */
export const getOrchidId = (orchid) => {
  return orchid.orchidId ?? orchid.id;
};

/**
 * Get orchid image URL with fallback
 */
export const getOrchidImage = (orchid) => {
  return orchid.orchidUrl || DEFAULT_IMAGE_URL;
};

/**
 * Transform form data to orchid object for API
 */
export const transformOrchidData = (formData) => {
  const orchidData = {
    ...formData,
    category: {
      categoryId: parseInt(formData.categoryId),
    },
  };
  delete orchidData.categoryId;
  return orchidData;
};

/**
 * Extract error message from API response
 */
export const extractErrorMessage = (error, defaultMessage) => {
  return error.response?.data?.message || defaultMessage;
};

/**
 * Format orchid data from API to form data
 */
export const formatOrchidToForm = (orchid) => {
  return {
    name: orchid.name || "",
    orchidDescription: orchid.orchidDescription || "",
    categoryId: orchid.category?.categoryId || "",
    orchidUrl: orchid.orchidUrl || "",
    isNatural: Boolean(orchid.isNatural),
    isAttractive: Boolean(orchid.isAttractive),
  };
};
