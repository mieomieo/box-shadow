import { RGBA } from "../../BoxShadowContext";
import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

type ColorPickerProps = {
  color: RGBA;
  setColor: (color: RGBA) => void;
};

const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor: ColorResult) => {
    // console.log(color);
    setColor(newColor.rgb as RGBA);
  };

  return (
    <div className="cursor-pointer ">
      <div
        className="p-[3px] bg-white border-solid border border-zinc-400  inline-block"
        onClick={handleClick}
      >
        <div
          className="w-10 h-5  "
          style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
        />
      </div>
      {displayColorPicker ? (
        <div className="absolute z-50 ">
          <div
            className="fixed top-0 left-0 right-0 bottom-0"
            onClick={handleClose}
          />
          <SketchPicker disableAlpha color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
