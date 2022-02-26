import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shallow from "zustand/shallow";

import useGetOperationStore from "../../stores/operationStore";
import useGetCategoryStore from "../../stores/categoryStore";
import Loading from "../../components/Loading";
import OperationsList from "./components/OperationsList";
import TokenHook from "../../hook/tokenHook";
import FormAdd from "../../components/FormAdd";

export default function Home() {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("EXIT");
  const [send, setSend] = useState(0);
  const [categoryId, setCategoryId] = useState(undefined);
  const { tokenJWT } = TokenHook();
  const { getAllCategories, setTokenCategory, categories } =
    useGetCategoryStore(
      (state) => ({
        getAllCategories: state.getAllCategories,
        setTokenCategory: state.setTokenCategory,
        categories: state.categories,
      }),
      shallow
    );

  const {
    setToken,
    getData,
    data,
    addOperation,
    deleteOperation,
    isLoading,
    errorMessage,
    hasError,
  } = useGetOperationStore(
    (state) => ({
      setToken: state.setToken,
      getData: state.getData,
      data: state.data,
      addOperation: state.addOperation,
      deleteOperation: state.deleteOperation,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      hasError: state.hasError,
    }),
    shallow
  );

  useEffect(() => {
    const apiData = async () => {
      setToken(tokenJWT());
      setTokenCategory(tokenJWT());
      await getAllCategories().catch(null);
      await getData().catch(null);
    };
    apiData();
  }, [send]);

  if (isLoading) return <Loading title="Loading Results ..." />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOperation = {
      concept,
      amount,
      date: new Date(date),
      type,
      categoryId: Number(categoryId),
    };
    await addOperation(newOperation);
    setConcept("");
    setAmount("");
    setDate("");
    setSend(send + 1);
  };

  const handleRemove = async (id, e) => {
    const div = e.target.parentElement.parentElement.parentElement;
    await deleteOperation(id).catch(null);
    if (!hasError) {
      div.remove();
    }
  };

  return (
    <div>
      <div className="w-full">
        <div className="md:w-1/5  w-3/5  ml-5 bg-white border shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
          <p className="text-lg font-semibold leading-3">Total:</p>
          <span className="ml-10 text-base">${data.total}</span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="md:w-3/5">
          {hasError ? (
            <p>{errorMessage}</p>
          ) : (
            <OperationsList
              operations={data.operations10}
              remove={handleRemove}
              categories={categories}
            />
          )}
        </div>
        <div className="md:w-2/5">
          <div className="mt-6">
            <Link
              to="/category"
              className="text-center ml-4 text-sm border border-grey-500 rounded py-2 px-2 hover:bg-blue-700 hover:text-white"
            >
              Add New Category
            </Link>
            <p className="mt-5 ml-5 font-semibold text-lg dark:text-white">
              Add Operation
            </p>
            {categories ? (
              <FormAdd
                handleSubmit={handleSubmit}
                categories={categories}
                attributes={{
                  concept,
                  setConcept,
                  amount,
                  setAmount,
                  date,
                  setDate,
                  type,
                  setType,
                  categoryId,
                  setCategoryId,
                }}
                typeForm={true}
              />
            ) : (
              "You must first add a category"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
