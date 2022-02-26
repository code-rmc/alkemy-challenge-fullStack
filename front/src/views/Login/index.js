import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";

import usePostLoginStore from "../../stores/loginStore";
import Loading from "../../components/Loading";
import TokenHook from "../../hook/tokenHook";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  let navigate = useNavigate();
  const { isLogged, addToken } = TokenHook();
  const { setUser, sendLogin, data, isLoading, errorMessage, hasError } =
    usePostLoginStore(
      (state) => ({
        setUser: state.setUser,
        sendLogin: state.sendLogin,
        data: state.data,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
        hasError: state.hasError,
      }),
      shallow
    );

  useEffect(() => {
    if (data.token || isLogged) {
      addToken(data);
      navigate("../home", { replace: true });
    }
  }, [data, isLogged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(email, pass);
    await sendLogin(email, pass);
  };

  if (isLoading) {
    return <Loading title="Enviando Datos..." />;
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {hasError ?? <p>Ha ocurrido un error: {errorMessage}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col w-80 border p-3">
        <h2 className="mt-6 mb-4 text-center text-3xl font-bold text-gray-900">
          Login
        </h2>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          type="text"
          value={email}
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          type="password"
          value={pass}
          name="pass"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="group relative w-full flex justify-center py-2 px-4 my-5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Login
        </button>
      </form>
    </div>
  );
}
