import { BoxShadowContext } from "../BoxShadowContext";
import ColorPicker from "./common/ColorPicker";
import MLegacyCard from "./layout/MLegacyCard";
import { useContext, useState } from "react";
import { RGBColor } from "react-color";

const Preview = () => {
  const { listBoxShadow } = useContext(BoxShadowContext);

  const { rgba, boxShadow } = listBoxShadow;
  console.log(listBoxShadow);
  const [color, setColor] = useState<RGBColor>({
    r: 103,
    g: 232,
    b: 249,
    a: 1,
  });
  const [backgroundColor, setBackgroundColor] = useState<RGBColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  return (
    <>
      <MLegacyCard title="Preview">
        <div className="absolute flex gap-2 top-5 right-5">
          <ColorPicker
            color={backgroundColor}
            setColor={(color) => {
              setBackgroundColor(color);
            }}
          />
          <ColorPicker
            color={color}
            setColor={(color) => {
              setColor(color);
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: `rgb(${backgroundColor.r} ${backgroundColor.g} ${backgroundColor.b})`,
          }}
          className="h-64 grid  content-center"
        >
          <div
            style={{
              boxShadow: listBoxShadow
                .map((item) => {
                  console.log(item);
                  `rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${item.rgba.a})`;
                })
                .join(", "),
              // boxShadow: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a}) ${boxShadow.shiftDown}px ${boxShadow.shiftDown}px ${boxShadow.shiftDown}px ${boxShadow.shiftDown}px ${boxShadow.shiftDown}px)`,
              backgroundColor: `rgb(${color.r} ${color.g} ${color.b})`,
            }}
            className="w-40 h-40 ml-14 "
          ></div>
        </div>
      </MLegacyCard>
    </>
  );
};
export default Preview;
