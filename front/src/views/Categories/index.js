import { useEffect, useState } from "react";
import shallow from "zustand/shallow";

import categoryStore from "../../stores/categoryStore";
import Loading from "../../components/Loading";
import TokenHook from "../../hook/tokenHook";

export default function Categories() {
  const [idCategory, setIdCategory] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const { tokenJWT } = TokenHook();
  const {
    setTokenCategory,
    categories,
    addCategory,
    getByIdCategory,
    getAllCategories,
    isLoading,
    errorMessage,
    hasError,
  } = categoryStore(
    (state) => ({
      setTokenCategory: state.setTokenCategory,
      categories: state.categories,
      addCategory: state.addCategory,
      getByIdCategory: state.getByIdCategory,
      getAllCategories: state.getAllCategories,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      hasError: state.hasError,
    }),
    shallow
  );

  useEffect(() => {
    setTokenCategory(tokenJWT());
    getAllCategories().catch(null);
  }, []);

  const setInput = (e) => {
    const children = Array.from(e.target.parentNode.children);
    setCategory(children[1].textContent);
    setIdCategory(children[0].textContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCat = {
      name: category,
    };
    await addCategory(newCat);
    console.log(newCat);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const UpCategory = {
      id: idCategory,
      name: category,
    };
    console.log(UpCategory);
  };

  if (isLoading) return <Loading title="Sending..." />;

  return (
    <div>
      <div>{hasError ?? <p>An error has occurred: {errorMessage}</p>}</div>
      <div>
        {categories?.map((cate) => (
          <div key={cate.id}>
            <p>{cate.id}</p>
            <p>{cate.name}</p>
            <button onClick={setInput}>Edit</button>
          </div>
        ))}
      </div>
      <h3>Add Category</h3>
      <form onSubmit={!!idCategory ? handleSubmit : handleUpdate}>
        <input
          type="text"
          value={category}
          name={category}
          placeholder="category"
          onChange={(e) => setCategory(e.target.value)}
          required="required"
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}
