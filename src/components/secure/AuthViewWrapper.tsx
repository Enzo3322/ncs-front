import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl">
        Aguarde enquanto validamos suas credenciais
      </h1>
      <AiOutlineLoading3Quarters size={50} className="animate-spin" />
    </div>
  );
};

interface AuthViewWrapperProps {
  children: React.ReactNode;
}
export const AuthViewWrapper = ({ children }: AuthViewWrapperProps) => {
  const { pathname } = useRouter();
  const { authState } = useContext(AuthContext);

  if (pathname === "/") return children;

  if (authState === "loading") return <Loading />;

  if (authState === "unauthenticated") return <Loading />;

  if (authState === "authenticated") {
    return children;
  }
};
