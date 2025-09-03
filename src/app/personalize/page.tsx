import Card from "~/components/ui/card/Card";

export default function PersonalizationPage() {
  return (
    <main className="h-[100dvh] w-full">
      <div className="mx-auto flex h-full w-full max-w-[660px] flex-col px-[12px]">
        <div className="h-[10dvh] max-h-[100px] min-h-[40px]" />
        <img src="/brand/logo.svg" alt="logo" className="h-[40px]" />
        <div className="h-[10dvh] max-h-[100px] min-h-[40px]" />
        <p className="text-primary-text text-[22px]">Personalization</p>
        <div className="h-[8px]" />
        <p className="text-secondary-text-2 text-[16px]">
          More context on you leads to better course recommendations and
          planning abilities. We don't store grades (nor will we ask for them).
        </p>
        <div className="h-[28px]" />
        <Card
          title="Enable Course Memory Feature"
          isEnabled={false}
          description="This allows the Atlas AI to remember what courses you've taken, providing you with better guidance on which courses to take later."
          onToggle={() => {}}
        />
      </div>
    </main>
  );
}
