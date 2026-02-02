import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orchidService from "../services/orchidService";
import { TOAST_MESSAGES } from "../constants";
import { extractErrorMessage, formatOrchidToForm } from "../utils/orchidUtils";

/**
 * Custom hook for editing a single orchid
 */
export const useOrchidEdit = (orchidId) => {
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrchid = useCallback(async () => {
    setLoading(true);
    try {
      const data = await orchidService.getOrchidById(orchidId);
      setOrchid(data);
      return formatOrchidToForm(data);
    } catch (error) {
      console.error("Error fetching orchid:", error);
      const errorMsg = extractErrorMessage(error, TOAST_MESSAGES.ORCHID.LOAD_ERROR);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [orchidId]);

  const updateOrchid = useCallback(
    async (orchidData) => {
      try {
        await orchidService.updateOrchid(orchidId, orchidData);
        toast.success(TOAST_MESSAGES.ORCHID.UPDATE_SUCCESS);
        setTimeout(() => navigate("/"), 500);
        return true;
      } catch (error) {
        console.error("Error updating orchid:", error);
        const errorMsg = extractErrorMessage(error, TOAST_MESSAGES.ORCHID.UPDATE_ERROR);
        toast.error(errorMsg);
        return false;
      }
    },
    [orchidId, navigate],
  );

  useEffect(() => {
    if (orchidId) {
      fetchOrchid();
    }
  }, [orchidId, fetchOrchid]);

  return {
    orchid,
    loading,
    fetchOrchid,
    updateOrchid,
  };
};
