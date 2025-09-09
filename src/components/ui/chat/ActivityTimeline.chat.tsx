import { motion, AnimatePresence } from "motion/react";
import { TextShimmer } from "../TextShimmer";
import ActivityIcon from "./components/ActivityIcon.chat";
import ActivityLine from "./components/ActivityLine.chat";
import ActivityLoader from "./components/ActivityLoader.chat";
import ActivityText from "./components/ActivityText.chat";

export type ActivityTool = "thinking" | "searching";
export interface Steps {
  text: string;
  tool: ActivityTool;
  loading: boolean;
}

const ActivityTimeline = ({
  steps,
  loading,
}: {
  steps: Steps[];
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col items-start">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <ActivityLoader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-[20px]"
          >
            <TextShimmer
              className="w-[65px] font-sans text-[14px] font-[400]"
              duration={1}
            >
              Thinking...
            </TextShimmer>
            <div className="flex flex-row gap-[8px]">
              {/* Icons */}
              <div className="flex w-[14px] flex-col">
                {steps.map((step, i) => (
                  <div className="flex flex-col items-center" key={i}>
                    <ActivityIcon type={step.tool} />
                    {i < steps.length - 1 ? (
                      <ActivityLine pre={step.tool} post={steps[i + 1]!.tool} />
                    ) : null}
                  </div>
                ))}
              </div>
              {/* Text */}
              <div className="flex flex-col items-start">
                {steps.map((step, i) => (
                  <ActivityText text={step.text} i={i} key={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityTimeline;
