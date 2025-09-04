import React from "react";
import PaginationRowCount from "./pagination-row-count";
import PaginationControlButtons from "./pagination-control-buttons";

function DashboardPaginationControl() {
  return (
    <div className="flex items-center justify-between">
      <PaginationRowCount />
      <PaginationControlButtons />
    </div>
  );
}

export default DashboardPaginationControl;
