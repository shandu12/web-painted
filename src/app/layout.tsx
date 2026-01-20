'use client'
import React from "react";
import { ThemeProvider } from 'next-themes'
import Footer from "./components/footer";
import Header from "./components/header";
import "@/globals.css";
import { Provider } from 'react-redux'
import store from "./store";
import { persistStore } from "redux-persist";

persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en" >
      <title>Web Painted</title>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <Header />
            <div className="min-h-[60vh]">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}