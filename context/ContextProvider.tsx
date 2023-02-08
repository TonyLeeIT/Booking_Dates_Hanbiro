import { UserContextInterface, User } from "@/interface";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const initailState: UserContextInterface = {
  user: {
    id: null,
    userid: "",
    password: "",
    displayName: "Tien An CUt",
    photoUrl: "",
    createdAt: "",
    updatedAt: "",
  },
  updateUser: () => {},
};
const StateContext = createContext<UserContextInterface>(initailState);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initailState.user);

  const updateUser = (user: User) =>
    setUser((preState: User) => {
      return {
        ...preState,
        user,
      };
    });

  useEffect(() => {
    const fetchMeApi = async () => {
      const cookie = document.cookie;
      let jwt = "";
      if (cookie) jwt = cookie.replace("jwt=", "");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/api/v1/auth/me`,
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      if (res) {
        const me = res.data;
        setUser(me);
      }
    };
    fetchMeApi();
  }, []);
  const globalState: UserContextInterface = {
    user,
    updateUser,
  };
  return (
    <StateContext.Provider value={globalState}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
