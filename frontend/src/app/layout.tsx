'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from '@/components/layouts/header'
import Footer from '@/components/layouts/footer'
import { AuthProvider } from '@/contexts/AuthContext'
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
  modals
}: Readonly<{
  children: React.ReactNode;
  modals?: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="Toastify" />
            <Header />
              {children}
              {modals} 
            <Footer />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
