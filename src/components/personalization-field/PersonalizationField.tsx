"use client";

import { AnimatePresence, motion } from "framer-motion";
import CustomTextArea from "../ui/CustomTextArea";

interface PersonalizationFieldProps {
  title: string;
  placeholder: string;
  defaultValue?: string;
  onUpdate?: (value: string) => void;
  loading?: boolean;
}
const PersonalizationField = ({
  title,
  placeholder,
  defaultValue,
  onUpdate,
  loading = false,
}: PersonalizationFieldProps) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-primary-4 border-primary-9 h-[80px] w-full animate-pulse rounded-[12px] border-[1px]"
          />
        ) : (
          <motion.div
            key="textarea"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-primary-text text-[18px]">{title}</p>
            <div className="h-[12px]" />
            <CustomTextArea
              placeholder={placeholder}
              defaultValue={defaultValue}
              onUpdate={onUpdate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PersonalizationField;
