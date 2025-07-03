import React from "react";
import ReactDOM from "react-dom/client";
// import "amfe-flexible";

import App from "./App";

import "./assets/style/index.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <main className="dark text-foreground min-h-screen bg-[#000] text-center overflow-x-hidden w-screen box-border">
      <ToastProvider
          maxVisibleToasts={1}
          placement="top-center"
          toastProps={{
            shouldShowTimeoutProgress: true,
            classNames: {
              base: "!z-[9998] text-sm p-1",
            },
            timeout: 2000,
          }}></ToastProvider>
        <App />
      </main>
    </HeroUIProvider>
  </React.StrictMode>
);
