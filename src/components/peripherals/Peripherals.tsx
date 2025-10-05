import PeripheralCard from "./components/PeripheralCard";

interface PeripheralsProps {
  onWhyUseClick: () => void;
}

const Peripherals = ({ onWhyUseClick }: PeripheralsProps) => {
  return (
    <div className={`flex flex-row flex-wrap justify-center gap-[6px]`}>
      <PeripheralCard
        title={"Sign In"}
        onClick={() => {
          console.log("sign in");
        }}
      />
      <PeripheralCard
        title={"Why use this over OnCourse or ChatGPT"}
        onClick={onWhyUseClick}
      />
      <PeripheralCard
        title={"Build a 4-year plan"}
        href="https://docs.google.com/forms/d/e/1FAIpQLScJHq_sfozpOV5A8Kavwn3_YBjGR6K2ZRrrjFx8vb_27zkL6Q/viewform?usp=header"
      />
      <PeripheralCard
        title={"GitHub"}
        href="https://github.com/markmusic27/stanford-atlas"
      />
    </div>
  );
};

export default Peripherals;
