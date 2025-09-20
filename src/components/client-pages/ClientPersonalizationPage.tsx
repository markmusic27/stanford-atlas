"use client";

import PersonalizationField from "../personalization-field/PersonalizationField";
import Card from "../ui/card/Card";
import Logo from "../ui/Logo";
import SaveButton from "../ui/SaveButton";
import { useFadeIn } from "../../hooks/useFadeIn";
import { TRANSITION_DURATION } from "~/lib/constants";
import { usePageTransitionStore } from "~/store/pageTransition.store";
import { useRouter } from "next/navigation";

const ClientPersonalizationPage = () => {
  const { opacity, transition } = useFadeIn(TRANSITION_DURATION);
  const queuedTransition = usePageTransitionStore(
    (state) => state.queuedTransition,
  );
  const enqueue = usePageTransitionStore((state) => state.enqueue);
  const dequeue = usePageTransitionStore((state) => state.dequeue);
  const router = useRouter();

  async function handleRouter(): Promise<void> {
    enqueue();
    await new Promise((resolve) => setTimeout(resolve, TRANSITION_DURATION));
    router.push("/");
    await new Promise((resolve) => setTimeout(resolve, 100));
    dequeue();
  }

  // Override opacity to 0 when queuedTransition is true
  const currentOpacity = queuedTransition ? 0 : opacity;

  return (
    <main className="w-full">
      <div
        className="mx-auto flex h-full w-full max-w-[660px] flex-col px-[12px]"
        style={{ opacity: currentOpacity, transition }}
      >
        <div className="h-[6dvh] max-h-[60px] min-h-[20px]" />
        <div onClick={handleRouter} className="cursor-pointer">
          <Logo />
        </div>
        <div className="h-[6dvh] max-h-[60px] min-h-[20px]" />
        <p className="text-primary-text text-[22px]">Personalization</p>
        <div className="h-[8px]" />
        <p className="text-secondary-text-2 text-[16px]">
          More context on you leads to better course recommendations and
          planning abilities. We don&apos;t store grades (nor will we ask for
          them).
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
          placeholder="Don't just include the academic! Clubs, causes, scenes you're into. Steve Jobs' favorite class was calligraphy. Weird interests can lead you to discover what could be your favorite class."
        />
        <div className="h-[28px]" />
        <PersonalizationField
          title="What do you want to be when you grow up?"
          placeholder="Think in verbs, not titles: build, discover, teach, etc. Tell us the kinds of problems you want to tackle, who you hope to help, and the setting you imagine (lab, startup, classroom, clinic, stage, etc)."
        />
        <div className="h-[28px]" />
        <SaveButton
          text="Save Preferences"
          className="mx-auto"
          onClick={handleRouter}
        />
        <div className="h-[8dvh] max-h-[80px] min-h-[30px]" />
      </div>
    </main>
  );
};

export default ClientPersonalizationPage;
