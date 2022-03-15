import Search from "./search";
const Header = () => {
  return (
    <div className="bg-white h-16 flex shadow-2xl">
      <div className="w-80">
        <h1>DevJobs</h1>
      </div>
      <div className=" flex flex-1 items-center ">
        <Search />
      </div>
      <div className="w-52">Filters</div>
    </div>
  );
};

export default Header;
