import "./App.css";
import AppRoutes from "./routes";
import { UseUserContext } from "./context/userContext";
import Header from "./components/Header";

function App() {
  return (
    <UseUserContext>
      <Header />
      <AppRoutes />
    </UseUserContext>
  );
}

export default App;
