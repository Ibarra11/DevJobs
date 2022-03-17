import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Content from "./content";
import Header from "./header";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex content-area h-full">
        <Sidebar></Sidebar>
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Layout;
