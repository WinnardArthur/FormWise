import React from "react";

import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/theme-switcher";

const SubmitLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-w-full h-full bg-background">
      <nav className="flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default SubmitLayout;
