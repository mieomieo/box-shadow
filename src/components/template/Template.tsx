import { BoxShadowContext } from "../../BoxShadowContext";
import MLegacyCard from "../layout/MLegacyCard";
import "./index.scss";
import template from "./template.json";
import { useContext } from "react";

const Template = () => {
  const context = useContext(BoxShadowContext);
  const { setListBoxShadow } = context;
  const handleChooseTemplate = (id: number) => {
    setListBoxShadow(template[id - 1]);
  };
  return (
    <>
      <MLegacyCard title="Template">
        <div className="flex gap-8 h-16">
          <div
            id="template-1"
            onClick={() => handleChooseTemplate(1)}
            className=" bg-[#79dff1] w-10 h-10"
          ></div>
          <div
            onClick={() => handleChooseTemplate(2)}
            id="template-2"
            className="2 bg-[#79dff1] w-10 h-10 "
          ></div>
        </div>
      </MLegacyCard>
    </>
  );
};
export default Template;
