import { createContext } from "react";

interface DefaultContextType {}

export const DefaultContext = createContext<DefaultContextType | null>(null);

export const DefaultContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DefaultContext.Provider value={{}}>{children}</DefaultContext.Provider>
  );
};
