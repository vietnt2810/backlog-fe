import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import ja from "antd/locale/ja_JP";

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
      <ConfigProvider theme={baseTheme} locale={ja}>
        <AuthenticationProvider>
          <AppRoutes />
        </AuthenticationProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
