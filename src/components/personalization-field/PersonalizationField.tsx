import CustomTextArea from "../ui/CustomTextArea";

interface PersonalizationFieldProps {
  title: string;
  placeholder: string;
}
const PersonalizationField = ({
  title,
  placeholder,
}: PersonalizationFieldProps) => {
  return (
    <>
      <p className="text-primary-text text-[18px]">{title}</p>
      <div className="h-[12px]" />
      <CustomTextArea placeholder={placeholder} />
    </>
  );
};

export default PersonalizationField;
