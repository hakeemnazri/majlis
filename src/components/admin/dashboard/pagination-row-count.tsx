import React from "react";

function PaginationRowCount() {
  return (
    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
      {0} of {50} row(s) selected.
    </div>
  );
}

export default PaginationRowCount;
