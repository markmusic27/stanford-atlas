import PeripheralCard from "./components/PeripheralCard";

const Peripherals = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-[6px]">
      <PeripheralCard
        title={"Sign In"}
        onAction={async () => {
          //  TODO: implement sign in later (USE CLERK)
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
        href="https://github.com/markmusic27/stanford-atlas"
        target="_blank"
      />
    </div>
  );
};

export default Peripherals;
