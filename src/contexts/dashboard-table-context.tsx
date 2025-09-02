"use client";
import React, { createContext } from "react";

type DashboardTableContextProviderProps = {
  children: React.ReactNode;
};

type TDashboardTableContext = {
  hello: string;
};

export const DashboardTableContext =
  createContext<TDashboardTableContext | null>(null);

function DashboardTableContextProvider({
  children,
}: DashboardTableContextProviderProps) {
  const hello = "world";
  return (
    <DashboardTableContext.Provider value={{ hello }}>
      {children}
    </DashboardTableContext.Provider>
  );
}

export default DashboardTableContextProvider;
