import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import orchidService from "../services/orchidService";
import { TOAST_MESSAGES } from "../constants";
import { extractErrorMessage } from "../utils/orchidUtils";

/**
 * Custom hook for managing orchids list
 */
export const useOrchids = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrchids = async () => {
    setLoading(true);
    try {
      const data = await orchidService.getAllOrchids();
      setOrchids(data);
    } catch (error) {
      console.error("Error fetching orchids:", error);
      toast.error(TOAST_MESSAGES.ORCHID.LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const addOrchid = async (orchidData) => {
    try {
      await orchidService.createOrchid(orchidData);
      toast.success(TOAST_MESSAGES.ORCHID.ADD_SUCCESS);
      await fetchOrchids();
      return true;
    } catch (error) {
      console.error("Error adding orchid:", error);
      const errorMsg = extractErrorMessage(error, TOAST_MESSAGES.ORCHID.ADD_ERROR);
      toast.error(errorMsg);
      return false;
    }
  };

  const deleteOrchid = async (id) => {
    try {
      await orchidService.deleteOrchid(id);
      toast.success(TOAST_MESSAGES.ORCHID.DELETE_SUCCESS);
      await fetchOrchids();
      return true;
    } catch (error) {
      console.error("Error deleting orchid:", error);
      const errorMsg = extractErrorMessage(error, TOAST_MESSAGES.ORCHID.DELETE_ERROR);
      toast.error(errorMsg);
      return false;
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  return {
    orchids,
    loading,
    fetchOrchids,
    addOrchid,
    deleteOrchid,
  };
};
