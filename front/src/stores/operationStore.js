import create from "zustand";
import apiCall from "../api/operationApi";

const useGetOperationStore = create((set, get) => ({
  data: [],
  token: "",
  isLoading: true,
  errorMessage: "",
  hasError: false,
  setToken: (tokenJWT) => {
    set({ token: tokenJWT });
  },
  getData: async () => {
    try {
      set({
        isLoading: true,
        errorMessage: "",
        hasError: false,
      });
      const res = await apiCall({ token: get().token, method: "GET" });
      set({ data: await res.json() });
    } catch (error) {
      set({
        data: [],
        errorMessage: error.message,
        hasError: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // ENVIO DE FORMULARIO
  operation: {},
  addOperation: async (newOperation) => {
    if (!newOperation) return;
    set({
      isLoading: true,
      errorMessage: "",
      hasError: false,
    });
    try {
      const res = await apiCall({
        token: get().token,
        method: "POST",
        body: newOperation,
      });
      set({ operation: res });
    } catch (error) {
      set({
        operation: {},
        errorMessage: error.message,
        hasError: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // ELIMINAR OPERACION
  deleteOperation: async (id) => {
    if (!id) return;
    try {
      await apiCall({
        token: get().token,
        method: "DELETE",
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
}));

export default useGetOperationStore;
