import { ReactNode } from "react";
import Sidebar from "./layout/sidebar";
import Content from "./layout/content";
import Header from "./layout/header";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar></Sidebar>
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Layout;
