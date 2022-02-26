import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import Select from "react-select";

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
  }, []);

  if (isLoading) return <Loading title="Loading Results ..." />;

  const addContenedor = () => {
    return <div></div>;
  };

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
  };

  const handleRemove = async (id, e) => {
    const div = e.target.parentElement;
    await deleteOperation(id).catch(null);
    if (!hasError) {
      div.style.display = "none";
    }
  };

  return (
    <div className="flex">
      <div className="w-3/5">
        {hasError ? (
          <p>{errorMessage}</p>
        ) : (
          <OperationsList
            operations={data}
            remove={handleRemove}
            categories={categories}
          />
        )}
      </div>
      <div className="w-2/5">
        <div>
          <h3 className="prose-lg">Add Operation</h3>
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
  );
}
