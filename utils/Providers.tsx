'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
const queryClient = new QueryClient();
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <Toaster richColors position="bottom-center" /> */}
    </QueryClientProvider>
  );
}

export default Providers;
