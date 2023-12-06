import "./index.scss";
import MLegacyCard from "./layout/MLegacyCard";

const Template = () => {
  return (
    <>
      <MLegacyCard title="Template">
        <div className="flex gap-20">
          <div className="template-1 bg-[#79dff1] w-10 h-10"></div>
          <div className="template-2 bg-[#79dff1] w-10 h-10 "></div>
        </div>
      </MLegacyCard>
    </>
  );
};
export default Template;
