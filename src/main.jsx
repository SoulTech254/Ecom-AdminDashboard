import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <AppRoutes />
      </QueryClientProvider>
      <Toaster visibleToasts={1} position="top-center" richColors />
    </Router>
  </React.StrictMode>
);
