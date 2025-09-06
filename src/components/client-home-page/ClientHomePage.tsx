"use client";

import Peripherals from "../peripherals/Peripherals";
import SearchBar from "../search-bar/SearchBar";
import Logo from "../ui/Logo";

const ClientHomePage = () => {
  return (
    <main className="relative h-[100dvh] w-full">
      {/* Chat Window */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[800px] flex-col px-[8px] md:px-[16px]">
        <div className="flex-1" />
        <Logo />
        <div className="h-[10dvh] max-h-[95px] min-h-[40px]" />
        <SearchBar
          onSubmit={(query) => {
            console.log(query);
          }}
        />
        <div className="h-[32px]" />
        <Peripherals />
        <div className="flex-2" />
      </div>
      <p className="text-secondary-text-6 absolute bottom-[36px] left-1/2 -translate-x-1/2 text-center text-[14px]">
        Courses last updated yesterday @ 11:59 PM
      </p>
    </main>
  );
};

export default ClientHomePage;
