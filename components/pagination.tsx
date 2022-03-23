import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface Props {
  totalCount: number;
  offset: number;
  currentPage: number;
  onPageChange: (direction: "previous" | "next") => void;
}

const Pagination = ({
  totalCount,
  offset,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalCount / offset);

  const handlePageChange = (direction: "previous" | "next") => {
    if (direction === "previous" && currentPage > 1) {
      onPageChange("previous");
    } else if (direction === "next" && currentPage < totalPages) {
      onPageChange("next");
    }
  };

  return (
    <div className="w-1/2 flex justify-center gap-4">
      <button
        className="flex items-center border-4"
        onClick={() => handlePageChange("previous")}
      >
        <GrFormPrevious size={24} />
      </button>
      <p className=" text-xl">
        {currentPage} of {totalPages}
      </p>
      <button className="border-4" onClick={() => handlePageChange("next")}>
        <GrFormNext size={24} />
      </button>
    </div>
  );
};

export default Pagination;
