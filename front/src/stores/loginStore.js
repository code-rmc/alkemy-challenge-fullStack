import create from "zustand";
import apiCall from "../api/loginApi";

const usePostLoginStore = create((set, get) => ({
  data: {}, // Respuesta
  isBody: { email: "", password: "" }, // Envio de email y pass
  isLoading: false,
  errorMessage: "",
  hasError: false,
  // Setter de variables
  setUser: (email, password) =>
    set((state) => {
      state.isBody = { email, password };
    }),
  // Login
  sendLogin: async function (email, password) {
    try {
      set({
        isLoading: true,
        errorMessage: "",
        hasError: false,
      });
      const body = get().isBody;
      const res = await apiCall({ method: "POST", body });
      set({ data: await res.json() });
    } catch (error) {
      set({
        data: {},
        isBody: {},
        errorMessage: error.message,
        hasError: true,
        isLoading: false,
      });
    } finally {
      set({ isLoading: false, isBody: {} });
    }
  },
}));

export default usePostLoginStore;
