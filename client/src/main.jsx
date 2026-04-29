import App from "./App.jsx";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./stores/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = document.getElementById("root");

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>,
);
