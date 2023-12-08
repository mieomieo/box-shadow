import App from "./App.tsx";
import { BoxShadowProvider } from "./BoxShadowContext";
import "./index.css";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
// import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AppProvider i18n={enTranslations}>
    <BoxShadowProvider>
      <App />
    </BoxShadowProvider>
  </AppProvider>
  // </React.StrictMode>
);
