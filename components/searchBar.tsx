import { ImSearch, ImLocation } from "react-icons/im";
const SearchBar = () => {
  return (
    <div className="hidden lg:flex w-full divide-x-2">
      <div className="relative flex flex-[4] items-center  b px-8">
        <div className="absolute flex items-center">
          <ImSearch size={24} />
        </div>
        <input
          type="text"
          className="w-full  border-none bg-transparent py-2 px-9"
          placeholder="Filter by title, companies, expertise..."
        />
      </div>
      <div className="relative flex items-center   px-8">
        <div className="absolute flex items-center">
          <ImLocation size={24} />
        </div>
        <select
          className="w-full px-9 py-2 border-none bg-transparent"
          name=""
          id=""
        >
          <option disabled selected hidden value="">
            Filter by location
          </option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Japan</option>
        </select>
      </div>
      <div className=" flex items-center gap-7 md:pl-5 md:pr-4 lg:pl-8 lg:pr-4   ">
        <div className="flex items-center gap-4 ml-8 my-7">
          <input className=" w-6 h-6" type="checkbox" name="" id="" />
          <p className="text-base hidden lg:block">Full Time Only</p>
          <p className="text-base lg:hidden">Full Time</p>
        </div>
        <button className="md:w-20 md:h-12 lg:w-32 lg:h-12 bg-purple-500  rounded-md ">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
