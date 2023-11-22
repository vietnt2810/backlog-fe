import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";

import AuthenticationProvider from "@/components/organisms/AuthenticationProvider/AuthenticationProvider";
import AppRoutes from "@/routes";
import baseTheme from "@/styles/themes/baseTheme.json";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 3000,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider theme={baseTheme}>
        <AuthenticationProvider>
          <AppRoutes />
        </AuthenticationProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
