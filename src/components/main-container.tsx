import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      {children}
    </main>
  );
}

export default MainContainer;
