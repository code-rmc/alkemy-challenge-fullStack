import create from "zustand";
import apiCall from "../api/registerApi";

const useRegisterStore = create((set, get) => ({
  data: {}, // Respuesta
  isBody: { email: "", password: "", name: "" }, // Envio de email y pass
  isLoading: false,
  errorMessage: "",
  hasError: false,
  // Setter de variables
  setUser: (email, password, name) =>
    set((state) => {
      state.isBody = { email, password, name };
    }),
  // Register
  setRegister: async () => {
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

export default useRegisterStore;
