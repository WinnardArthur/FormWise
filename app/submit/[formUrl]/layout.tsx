import React from "react";

import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/theme-switcher";

const SubmitLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen max-h-screen min-w-full bg-background h-screen">
      <nav className="flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex w-full h-full flex-grow">{children}</main>
    </div>
  );
};

export default SubmitLayout;
