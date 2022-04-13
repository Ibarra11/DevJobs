import { FaHome, FaSave, FaArchive } from "react-icons/fa";
import Link from "next/link";
// hover:[background-color:#52A7CD]
// #F0F1EF
const Sidebar = () => {
  return (
    <div
      style={{ backgroundColor: "#203b57", color: "#EDE9EF" }}
      className="hidden   lg:block  w-80"
    >
      <div className="grid  place-content-center h-20  border-b-2 ">
        <h1 className=" text-4xl">DevJobs</h1>
      </div>
      <div className="pt-6 ">
        <ul className="flex flex-col gap-4 text-2xl">
          <li>
            <Link href="/">
              <a className="flex gap-8 items-center py-3 px-4 hover:bg-slate-600 hover:cursor-pointer">
                <div>
                  <FaHome className="group-hover:[color:red]" size={24} />
                </div>
                <p className="text-2xl group-hover:text-white">Home</p>
              </a>
            </Link>
          </li>
          <li className="flex gap-8 items-center py-3 px-4 hover:bg-slate-600 hover:cursor-pointer">
            <div>
              <FaArchive size={24} />
            </div>
            <p className="text-2xl">Applied Jobs</p>
          </li>
          <li className="flex gap-8 items-center py-3 px-4 hover:bg-slate-600 hover:cursor-pointer">
            <div>
              <FaSave size={24} />
            </div>
            <p className="text-2xl">Saved Jobs</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
