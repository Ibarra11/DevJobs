import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{ backgroundColor: "#C3CEDA" }}
      className="flex-1 h-1/2 overflow-auto"
    >
      {children}
    </div>
  );
};

export default Content;
