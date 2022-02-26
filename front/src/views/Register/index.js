import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import shallow from "zustand/shallow";

import useRegisterStore from "../../stores/registerStore";
import Loading from "../../components/Loading";

export default function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const { setUser, setRegister, data, isLoading, errorMessage, hasError } =
    useRegisterStore(
      (state) => ({
        setRegister: state.setRegister,
        setUser: state.setUser,
        data: state.data,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
        hasError: state.hasError,
      }),
      shallow
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(email, pass, name);
    await setRegister();
    if (!hasError && data) {
      navigate("/");
    }
  };

  if (isLoading) {
    return <Loading title="Enviando Datos..." />;
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {hasError ?? <p>Ha ocurrido un error: {errorMessage}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col w-80 border p-3">
        <h2 className="mt-6 mb-4 text-center text-3xl font-bold text-gray-900">
          Register new User
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
          className="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          type="text"
          value={name}
          name="name"
          placeholder="Userame"
          onChange={(e) => setName(e.target.value)}
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
          Register
        </button>
        <Link
          className="bg-white-800 text-white px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 mr-3"
          to="/"
        >
          Back to login
        </Link>
      </form>
    </div>
  );
}
