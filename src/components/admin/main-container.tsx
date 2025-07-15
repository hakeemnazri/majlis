import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return (
    <main className="flex flex-col min-h-screen transition-all duration-300 ease-in-out md:max-w-2xl lg:max-w-4xl mx-auto">
      {children}
    </main>
  );
}

export default MainContainer;
