"use client";

import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export const MedusaWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000"}
    >
      {children}
    </MedusaProvider>
  );
};
