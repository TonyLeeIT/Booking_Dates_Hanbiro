import { AuthResponse, AuthResponseContextInterface } from "@/interface";
import { ReactNode, createContext, useContext, useState } from "react";

const initailState: AuthResponse = {
  jwt: "",
  user: {
    id: null,
    userid: "",
    password: "",
    displayName: "",
    photoUrl: "",
  },
};
const StateContext = createContext<AuthResponseContextInterface | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);

  const updateAuthResponse = (authResponse: AuthResponse) =>
    setAuthResponse(authResponse);

  const globalState: AuthResponseContextInterface = {
    authResponse,
    updateAuthResponse,
  };
  return (
    <StateContext.Provider value={globalState}>
      {" "}
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
