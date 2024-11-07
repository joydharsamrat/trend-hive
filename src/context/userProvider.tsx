"use client";

import { getUser } from "@/actions/registerUser";
import { TUserAuth } from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<TUserProviderValues | undefined>(undefined);

type TUserProviderValues = {
  user: TUserAuth | null;
  isLoading: boolean;
  setUser: (user: TUserAuth | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUserAuth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getUser();

    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
