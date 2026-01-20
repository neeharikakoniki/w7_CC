import Header from "../components/Header";
import type { ReactNode } from "react";


type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({children}:AppLayoutProps) {
  return (
    <div>
     <Header/>
    </div>
  );
}

export default AppLayout;