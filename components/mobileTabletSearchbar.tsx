import { FaFilter, FaSearch } from "react-icons/fa";
const MobileTabletSearchbar = () => {
  return (
    <div className="w-full lg:hidden flex gap-6 pr-4 pl-4 ">
      <div className="flex-1 flex items-center">
        <input
          className="h-full w-full"
          type="text"
          placeholder="Search by job, expertise"
        />
      </div>
      <div className="flex items-center ">
        <button className="p-4">
          <FaFilter size={20} />
        </button>
      </div>
      <div className="flex items-center">
        <button className=" flex items-center justify-center rounded-md w-12 bg-purple-600 h-12">
          <FaSearch size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default MobileTabletSearchbar;
