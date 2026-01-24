import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import SmoothScroll from "./components/SmoothScroll";
import LoadingContextProvider from "./context/LoadingContext";

createRoot(document.getElementById("root")).render(
  <LoadingContextProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </AuthContextProvider>
    </BrowserRouter>
  </LoadingContextProvider>
);
