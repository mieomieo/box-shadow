import { BoxShadowContext, RGBA } from "../BoxShadowContext";
import ColorPicker from "./common/ColorPicker";
import MLegacyCard from "./layout/MLegacyCard";
import { useContext, useState } from "react";

const Preview = () => {
  const { listBoxShadow } = useContext(BoxShadowContext);
  const boxShadowCSS = listBoxShadow
    .map(
      (item) =>
        `rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${
          item.boxShadow.opacity / 100
        }) ${item.boxShadow.shiftRight}px ${item.boxShadow.shiftDown}px ${
          item.boxShadow.blur
        }px ${item.boxShadow.spread}px ${item.boxShadow.inset ? "inset" : ""}`
    )
    .join(", ");

  const [color, setColor] = useState<RGBA>({
    r: 103,
    g: 232,
    b: 249,
    a: 1,
  });
  const [backgroundColor, setBackgroundColor] = useState<RGBA>({
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
              boxShadow: `${boxShadowCSS}`,
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
