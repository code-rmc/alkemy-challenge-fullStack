import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";

import detailStore from "../../stores/detailStore";
import useGetCategoryStore from "../../stores/categoryStore";
import Loading from "../../components/Loading";
import TokenHook from "../../hook/tokenHook";
import FormAdd from "../../components/FormAdd";

export default function Details() {
  const { operationId } = useParams();
  let navigate = useNavigate();
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
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
    getByIdOperation,
    updateOperation,
    isLoading,
    errorMessage,
    hasError,
  } = detailStore(
    (state) => ({
      setToken: state.setToken,
      getByIdOperation: state.getByIdOperation,
      updateOperation: state.updateOperation,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      hasError: state.hasError,
    }),
    shallow
  );

  useEffect(() => {
    setToken(tokenJWT());
    getByIdOperation(operationId)
      .then((data) => data.json())
      .then((res) => {
        setConcept(res.concept);
        setAmount(res.amount);
        setDate(res.date.split("T", 1));
        setCategoryId(res.categoryId);
      });
    setTokenCategory(tokenJWT());
    getAllCategories().catch(null);
  }, [operationId]);

  if (isLoading) return <Loading title="Cargando Resultados..." />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modOperation = {
      concept,
      amount: Number(amount),
      date: new Date(date),
      categoryId: Number(categoryId),
      id: Number(operationId),
    };
    await updateOperation(modOperation);
    if (!hasError) {
      navigate("../home");
    }
  };

  return (
    <div>
      {hasError ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <h3>Update Operation {operationId}</h3>

          <FormAdd
            handleSubmit={handleSubmit}
            categories={categories}
            typeForm={false}
            attributes={{
              concept,
              setConcept,
              amount,
              setAmount,
              date,
              setDate,
              categoryId,
              setCategoryId,
            }}
          />
        </div>
      )}
    </div>
  );
}
