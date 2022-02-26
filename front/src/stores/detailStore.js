import create from "zustand";
import apiCall from "../api/operationApi";

const useGetOperationStore = create((set, get) => ({
  token: "",
  isLoading: true,
  errorMessage: "",
  hasError: false,
  setToken: (tokenJWT) => {
    set({ token: tokenJWT });
  },
  // GET OPERATION ID
  getByIdOperation: async (id) => {
    if (!id) return;
    set({
      isLoading: true,
      errorMessage: "",
      hasError: false,
    });
    try {
      return await apiCall({
        token: get().token,
        method: "GET",
        id,
      });
    } catch (error) {
      set({
        errorMessage: error.message,
        hasError: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // MODIFICACION
  updateOperation: async (operationDetails) => {
    if (!operationDetails) return;
    try {
      set({
        isLoading: true,
        errorMessage: "",
        hasError: false,
      });
      await apiCall({
        token: get().token,
        method: "PUT",
        body: operationDetails,
        id: operationDetails.id,
      });
    } catch (error) {
      set({
        errorMessage: error.message,
        hasError: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useGetOperationStore;
