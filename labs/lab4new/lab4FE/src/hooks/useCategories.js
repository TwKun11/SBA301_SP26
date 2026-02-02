import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import categoryService from "../services/categoryService";
import { TOAST_MESSAGES } from "../constants";

/**
 * Custom hook for managing categories
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(TOAST_MESSAGES.CATEGORY.LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
  };
};
