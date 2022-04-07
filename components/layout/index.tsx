import { ReactNode } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import Sidebar from "./sidebar";
import Content from "./content";
import Header from "./header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Header />

        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Layout;
