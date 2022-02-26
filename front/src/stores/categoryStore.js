import create from "zustand";
import apiCall from "../api/categoryApi";

const useGetCategoryStore = create((set, get) => ({
  categories: [],
  token: "",
  isLoading: true,
  errorMessage: "",
  hasError: false,
  setTokenCategory: (tokenJWT) => {
    set({ token: tokenJWT });
  },
  // GET ALL CATEGORIES
  getAllCategories: async () => {
    try {
      set({
        isLoading: true,
        errorMessage: "",
        hasError: false,
      });
      const res = await apiCall({ token: get().token, method: "GET" });
      set({ categories: await res.json() });
    } catch (error) {
      set({
        categories: [],
        errorMessage: error.message,
        hasError: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // ADD CATEGORY
  addCategory: async (newCategory) => {
    if (!newCategory) return;
    set({
      isLoading: true,
      errorMessage: "",
      hasError: false,
    });
    try {
      await apiCall({
        token: get().token,
        method: "POST",
        body: newCategory,
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
  // GET CATEGORY ID
  getByIdCategory: async (id) => {
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
  updateCategory: async (categoryDetails) => {
    if (!categoryDetails) return;
    try {
      set({
        isLoading: true,
        errorMessage: "",
        hasError: false,
      });
      await apiCall({
        token: get().token,
        method: "PUT",
        body: categoryDetails,
        id: categoryDetails.id,
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

export default useGetCategoryStore;
