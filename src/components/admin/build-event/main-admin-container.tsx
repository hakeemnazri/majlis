import React from "react";

type MainAdminContainerProps = {
  children: React.ReactNode;
};

function MainAdminContainer({ children }: MainAdminContainerProps) {
  return (
    <main className="w-full flex flex-col items-center">
      {children}
    </main>
  );
}

export default MainAdminContainer;
