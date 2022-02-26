import { useEffect, useState } from "react";
import shallow from "zustand/shallow";

import categoryStore from "../../stores/categoryStore";
import Loading from "../../components/Loading";
import TokenHook from "../../hook/tokenHook";

export default function Categories() {
  const [idCategory, setIdCategory] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [send, setSend] = useState(0);
  const { tokenJWT } = TokenHook();
  const {
    setTokenCategory,
    setCategories,
    categories,
    addCategory,
    updateCategory,
    getAllCategories,
    removeCategory,
    isLoading,
    errorMessage,
    hasError,
  } = categoryStore(
    (state) => ({
      setTokenCategory: state.setTokenCategory,
      setCategories: state.setCategories,
      categories: state.categories,
      addCategory: state.addCategory,
      updateCategory: state.updateCategory,
      getAllCategories: state.getAllCategories,
      removeCategory: state.removeCategory,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      hasError: state.hasError,
    }),
    shallow
  );

  useEffect(() => {
    setTokenCategory(tokenJWT());
    getAllCategories().catch(null);
  }, [send]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCat = {
      name: category,
    };
    await addCategory(newCat);
    setSend(send + 1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const UpCategory = {
      id: Number(idCategory),
      name: category,
    };
    await updateCategory(UpCategory);
    setCategories(UpCategory, { type: "update" });
  };

  const handleRemove = async (id, e) => {
    const div = e.target.parentNode;
    await removeCategory(id).catch(null);
    setSend(send + 1);
    if (!hasError) {
      div.remove();
    }
  };

  const setInputMod = (e) => {
    const children = Array.from(e.target.parentNode.children);
    setCategory(children[1].textContent);
    setIdCategory(children[0].textContent);
  };

  const cancelEdit = () => {
    setIdCategory(undefined);
    setCategory("");
  };

  if (isLoading) return <Loading title="Sending..." />;

  return (
    <div className="grid md:grid-cols-4 ">
      <div>{hasError ?? <p>An error has occurred: {errorMessage}</p>}</div>
      <div>
        <p className="text-lg font-semibold ">List Categories</p>
        {categories?.map((listCategory) => (
          <div
            key={listCategory.id}
            className="flex justify-around mt-3 mx-5 p-2 border bg-slate-600 text-white rounded-md hover:bg-slate-700"
          >
            <p>{listCategory.id}</p>
            <p>{listCategory.name}</p>
            <button
              className="border border-teal-600 text-white rounded bg-teal-600 font-medium p-1 mx-2"
              onClick={setInputMod}
            >
              Edit
            </button>
            <button
              className="border border-red-600 text-white rounded bg-red-600 font-medium p-1"
              onClick={(e) => handleRemove(listCategory.id, e)}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
      <div className="ml-4">
        <p className="text-lg">Add Category</p>
        <form onSubmit={!!idCategory ? handleUpdate : handleSubmit}>
          <div className="grid xl:grid-cols-2 mt-4">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                value={category}
                name={category}
                id="category"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setCategory(e.target.value)}
                required="required"
              />
              <label
                htmlFor="category"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
          </div>

          <div className="flex">
            <button
              type="submit"
              className="text-center text-sm block border border-blue-500 rounded py-2 px-2 bg-blue-500 hover:bg-blue-700 text-white"
            >
              {idCategory ? "Update Category" : "Add Category"}
            </button>
            {idCategory && (
              <button
                className="text-center text-sm block ml-3 border border-red-500 rounded py-2 px-2 bg-red-500 hover:bg-red-700 text-white"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
