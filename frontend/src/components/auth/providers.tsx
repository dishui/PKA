'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { ReactNode, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a stable QueryClient instance
let queryClient: QueryClient | undefined

function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  }
  return queryClient
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={getQueryClient()}>
          {children}
        </QueryClientProvider>
      </Suspense>
    </AuthProvider>
  )
} 