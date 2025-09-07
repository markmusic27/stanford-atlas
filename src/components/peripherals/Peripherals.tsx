import PeripheralCard from "./components/PeripheralCard";

const Peripherals = () => {
  return (
    <div
      className={`flex flex-row flex-wrap justify-center gap-[6px] pt-[32px]`}
    >
      <PeripheralCard
        title={"Sign In"}
        onClick={() => {
          console.log("sign in");
        }}
      />
      <PeripheralCard
        title={"Why use this over Navigator"}
        onClick={() => {
          console.log("hello world");
        }}
      />
      <PeripheralCard
        title={"Build a 4-year plan"}
        onClick={() => {
          console.log("hello world");
        }}
      />
      <PeripheralCard
        title={"GitHub"}
        href="https://github.com/markmusic27/stanford-atlas"
      />
    </div>
  );
};

export default Peripherals;
