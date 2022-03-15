import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return <div className=" bg-lightgrey flex-1">{children}</div>;
};

export default Content;
