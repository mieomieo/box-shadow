import ColorPicker from "./common/ColorPicker";
import MLegacyCard from "./layout/MLegacyCard";
import { useState } from "react";
import { RGBColor } from "react-color";

const Preview = () => {
  const [color, setColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  return (
    <>
      <MLegacyCard title="Preview">
        <div className="absolute flex gap-2 top-5 left-32">
          <ColorPicker
            color={color}
            setColor={(color) => {
              setColor(color);
            }}
          />
          <ColorPicker
            color={color}
            setColor={(color) => {
              setColor(color);
            }}
          />
        </div>
      </MLegacyCard>
    </>
  );
};
export default Preview;
