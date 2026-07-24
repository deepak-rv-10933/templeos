import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { LocaleProvider } from '@/store/locale';
import { PreferencesProvider } from '@/store/preferences';
import { router } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <LocaleProvider>
          <RouterProvider router={router} />
        </LocaleProvider>
      </PreferencesProvider>
    </QueryClientProvider>
  );
}
