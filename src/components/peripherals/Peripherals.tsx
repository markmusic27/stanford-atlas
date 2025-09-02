import PeripheralCard from "./components/PeripheralCard";

const Peripherals = () => {
  return (
    <div className="flex flex-row justify-center gap-[6px]">
      <PeripheralCard title={"Sign In"} />
      <PeripheralCard title={"Why use this over Navigator"} />
      <PeripheralCard title={"Build a 4-year plan"} />
      <PeripheralCard title={"GitHub"} />
    </div>
  );
};

export default Peripherals;
