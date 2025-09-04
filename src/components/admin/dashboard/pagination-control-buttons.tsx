import PaginationChevronButtons from "./pagination-chevron-buttons";
import PaginationRowsPerPage from "./pagination-row-per-page";

function PaginationControlButtons() {
  return (
    <div className="flex w-full items-center gap-8 lg:w-fit">
      <PaginationRowsPerPage />

      <div className="flex w-fit items-center justify-center text-sm font-medium">
        Page {0} of {4}
      </div>

      <PaginationChevronButtons />
    </div>
  );
}

export default PaginationControlButtons;
