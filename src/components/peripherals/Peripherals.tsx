import PeripheralCard from "./components/PeripheralCard";
import { redirect } from "next/navigation";

const Peripherals = () => {
  return (
    <div className="flex flex-row justify-center gap-[6px]">
      <PeripheralCard
        title={"Sign In"}
        onAction={async () => {
          "use server";
          console.log("hello world");
        }}
      />
      <PeripheralCard
        title={"Why use this over Navigator"}
        onAction={async () => {
          "use server";
          console.log("hello world");
        }}
      />
      <PeripheralCard
        title={"Build a 4-year plan"}
        onAction={async () => {
          "use server";
          console.log("hello world");
        }}
      />
      <PeripheralCard
        title={"GitHub"}
        onAction={async () => {
          "use server";
          console.log("hello world");
          redirect("https://github.com/markmusic27/stanford-atlas");
        }}
      />
    </div>
  );
};

export default Peripherals;
