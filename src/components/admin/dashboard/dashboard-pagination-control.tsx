import React from "react";
import PaginationRowCount from "./pagination-row-count";
import PaginationControlButtons from "./pagination-control-buttons";

function DashboardPaginationControl() {
  return (
    <section className="flex items-center justify-between">
      <PaginationRowCount />
      <PaginationControlButtons />
    </section>
  );
}

export default DashboardPaginationControl;
