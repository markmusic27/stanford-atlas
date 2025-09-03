import PersonalizationField from "~/components/personalization-field/PersonalizationField";
import Card from "~/components/ui/card/Card";
import CustomTextArea from "~/components/ui/CustomTextArea";

export default function PersonalizationPage() {
  async function onUpdateAction(value: string) {
    "use server";
    console.log("Personalize onUpdate:", value);
  }
  return (
    <main className="w-full">
      <div className="mx-auto flex h-full w-full max-w-[660px] flex-col px-[12px]">
        <div className="h-[6dvh] max-h-[60px] min-h-[20px]" />
        <img src="/brand/logo.svg" alt="logo" className="h-[40px]" />
        <div className="h-[6dvh] max-h-[60px] min-h-[20px]" />
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
        />
        <div className="h-[28px]" />
        <PersonalizationField
          title="What's your major—or your best guess?"
          placeholder="It doesn't matter if you haven't declared. Describe what you're interested in studying at Stanford here."
        />
        <div className="h-[28px]" />
        <PersonalizationField
          title="Have any interests?"
          placeholder="Don't just include the academic! Clubs, causes, scenes you're into. Steve Job's favorite class was calligraphy. Weird interests can lead you to discover what could be your favorite class."
        />
        <div className="h-[28px]" />
        <PersonalizationField
          title="What do you want to be when you grow up?"
          placeholder="Think in verbs, not titles: build, discover, teach, etc. Tell us the kinds of problems you want to tackle, who you hope to help, and the setting you imagine (lab, startup, classroom, clinic, stage, etc)."
        />
        <div className="h-[1000px]" />
      </div>
    </main>
  );
}
