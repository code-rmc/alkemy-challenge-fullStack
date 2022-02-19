import create from "zustand";
import apiCall from "../api";

const useGetOperationStore = create((set, get) => ({
  data: [],
  isLoading: false,
  errorMessage: "",
  hasError: false,
  getData: async () => {
    try {
      set({
        isLoading: false,
        errorMessage: "",
        hasError: false,
      });
      const res = await apiCall({
        url: "https://challenge-alkemy-rmc.herokuapp.com/api/character",
      });
      set({ data: await res.json() });
    } catch (error) {
      set({
        data: [],
        errorMessage: error.message,
        hasError: true,
      });
    } finally {
      set({ isLoading: true });
    }
  },
  //   operationDetails: {},
  //   getDetails: async (id) => {
  //     if (!id) return;
  //     set({
  //       isLoading: false,
  //       errorMessage: "",
  //       hasError: false,
  //     });
  //     try {
  //       const details = await apiCall(
  //         `https://challenge-alkemy-rmc.herokuapp.com/api/character/${id}`
  //       );
  //       set({ operationDetails: details });
  //     } catch (error) {
  //       set({
  //         operationDetails: {},
  //         errorMessage: error.message,
  //         hasError: true,
  //       });
  //     } finally {
  //       set({ isLoading: true });
  //     }
  //   },
}));

export default useGetOperationStore;
