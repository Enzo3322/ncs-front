import { AuthViewWrapper } from "@/components/secure/AuthViewWrapper";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AuthProvider>
        <AuthViewWrapper>
          <Component {...pageProps} />
          <Toaster />
        </AuthViewWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
}
