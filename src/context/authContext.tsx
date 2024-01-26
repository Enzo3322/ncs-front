import { toast } from "@/components/ui/use-toast";
import { fetchWhoAmI } from "@/services/fetchWhoAmI";
import { useRouter } from "next/router";
import React, { createContext } from "react";
import { useQuery } from "react-query";

type AuthContextType = {
  authState: "loading" | "authenticated" | "unauthenticated";
  userData: null | Response;
};

export const AuthContext = createContext<AuthContextType>({
  authState: "unauthenticated",
  userData: null,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { push, pathname } = useRouter();

  const { data, isLoading, isError } = useQuery("auth", fetchWhoAmI, {
    onError: () => {
      if (pathname === "/") return;
      toast({
        title: "Erro de autenticação",
        description: "Você não está autenticado, por favor faça login",
        duration: 5000,
        variant: "destructive",
      });
      push("/");
    },
    retry: false,
  });

  const userData = data ?? null;

  let authState: "loading" | "authenticated" | "unauthenticated";

  if (isLoading) {
    authState = "loading";
  } else if (isError) {
    authState = "unauthenticated";
  } else {
    authState = "authenticated";
  }

  return (
    <AuthContext.Provider value={{ authState, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
