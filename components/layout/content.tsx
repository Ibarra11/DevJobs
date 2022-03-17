import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-lightgrey flex-1 h-full  py-20 px-12 border-4 border-green-600 ">
      {children}
    </div>
  );
};

export default Content;
