import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ backgroundColor: "#C3CEDA" }} className=" flex-1 h-full   ">
      {children}
    </div>
  );
};

export default Content;
