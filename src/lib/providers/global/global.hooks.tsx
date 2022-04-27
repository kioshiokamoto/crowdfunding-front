import { useContext } from "react";
import { GlobalContext } from "./global.context";
import { GlobalProviderValue } from "./global.context.types";

const useGlobal = () => {
  const context = useContext<GlobalProviderValue>(GlobalContext);
  if (typeof context === "undefined") {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

export default useGlobal;
