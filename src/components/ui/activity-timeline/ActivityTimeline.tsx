import { motion, AnimatePresence } from "motion/react";
import { TextShimmer } from "../TextShimmer";
import ActivityIcon from "./components/ActivityIcon";
import ActivityLine from "./components/ActivityLine";
import ActivityLoader from "./components/ActivityLoader";
import ActivityText from "./components/ActivityText";

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <ActivityLoader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-[20px]"
          >
            <TextShimmer
              className="font-sans text-[14px] font-[400]"
              duration={1.4}
            >
              Thinking. This may take a moment...
            </TextShimmer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityTimeline;
