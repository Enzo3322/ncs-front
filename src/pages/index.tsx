import { toast } from "@/components/ui/use-toast";
import { fetchLogin } from "@/services/fetchLogin";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation } from "react-query";

export default function Home() {
  const { push } = useRouter();

  const { mutate: loginHandler, isLoading: loginLoading } = useMutation(
    fetchLogin,
    {
      onSuccess: () => {
        push("/arquivos");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Email e/ou senha incorretos",
          description:
            "Tente novamente, caso o erro persista, contate o suporte para evitar que seu IP seja bloqueado.",
          duration: 5000,
        });
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    loginHandler({ email: email.value, password: password.value });
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-[#25266a]">
      <div className="flex flex-col p-8 items-center justify-center gap-12 bg-slate-100 w-[380px] h-[400px] rounded">
        <h1 className="font-semibold text-3xl">NCS Consultoria</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              required
              className="rounded p-2 border border-gray-400"
              type="email"
              placeholder="E-mail"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="password">
              Senha
            </label>
            <input
              required
              className="rounded p-2 border border-gray-400"
              type="password"
              name="password"
              placeholder="Senha"
              id="password"
            />
          </div>
          <button className="bg-[#4044ED] hover:bg-blue-600 transition-all rounded text-white p-2 text-center flex items-center justify-center h-[40px]">
            {loginLoading ? (
              <AiOutlineLoading3Quarters size={22} className="animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
