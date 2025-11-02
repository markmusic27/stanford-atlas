"use client";

import { motion } from "framer-motion";
import CustomTextArea from "../ui/CustomTextArea";

interface PersonalizationFieldProps {
  title: string;
  placeholder: string;
  defaultValue?: string;
  onUpdate?: (value: string) => void;
  loading?: boolean;
  delay?: number;
}
const PersonalizationField = ({
  title,
  placeholder,
  defaultValue,
  onUpdate,
  loading = false,
  delay = 0,
}: PersonalizationFieldProps) => {
  if (loading) {
    return <div className="h-[80px]" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <p className="text-primary-text text-[18px]">{title}</p>
      <div className="h-[12px]" />
      <CustomTextArea
        placeholder={placeholder}
        defaultValue={defaultValue}
        onUpdate={onUpdate}
      />
    </motion.div>
  );
};

export default PersonalizationField;
