import SearchBar from "../searchBar";
import MobileTabletSearchbar from "../mobileTabletSearchbar";
import { ImMenu } from "react-icons/im";
const Header = () => {
  return (
    <div className="bg-white h-20 flex  px-4 lg:px-0  drop-shadow-lg">
      <div className="flex items-center lg:hidden">
        <button className="p-4">
          <ImMenu size={24} />
        </button>
      </div>
      <SearchBar />
      <MobileTabletSearchbar />
    </div>
  );
};

export default Header;
