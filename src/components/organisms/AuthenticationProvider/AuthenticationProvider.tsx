import {
  createContext,
  Dispatch,
  useMemo,
  useState,
  SetStateAction,
} from "react";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/constants";

export type AuthenticationContextType = {
  accessToken: string;
  refreshToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setRefreshToken: Dispatch<SetStateAction<string>>;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  accessToken: "",
  refreshToken: "",
  setAccessToken: () => "",
  setRefreshToken: () => "",
});

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem(ACCESS_TOKEN_KEY) ?? ""
  );
  const [refreshToken, setRefreshToken] = useState<string>(
    localStorage.getItem(REFRESH_TOKEN_KEY) ?? ""
  );

  const valueContext = useMemo(
    () => ({ accessToken, refreshToken, setAccessToken, setRefreshToken }),
    [accessToken, refreshToken, setAccessToken, setRefreshToken]
  );

  return (
    <AuthenticationContext.Provider value={valueContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
