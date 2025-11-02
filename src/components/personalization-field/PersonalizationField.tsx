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
      <p className="text-primary-text text-[18px]">{title}</p>
      <div className="h-[12px]" />
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary-4 h-[80px] w-full animate-pulse rounded-[12px]"
          />
        ) : (
          <motion.div
            key="textarea"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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
