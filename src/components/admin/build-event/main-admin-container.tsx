import React from "react";

type MainAdminContainerProps = {
  children: React.ReactNode;
};

function MainAdminContainer({ children }: MainAdminContainerProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainAdminContainer;
