import { useEffect } from "react";
import shallow from "zustand/shallow";
import useGetOperationStore from "../../stores";
import Loading from "../../components/Loading";
import OperationsList from "./components/OperationsList";

export default function Home() {
  const { getData, data, isLoading, errorMessage, hasError } =
    useGetOperationStore(
      (state) => ({
        getData: state.getData,
        data: state.data,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
        hasError: state.hasError,
      }),
      shallow
    );

  useEffect(() => {
    getData().catch(null);
  }, []);

  if (!isLoading) return <Loading title="Cargando Resultados..." />;

  return hasError ? (
    <p>{errorMessage}</p>
  ) : (
    <OperationsList operations={data} />
  );
}
