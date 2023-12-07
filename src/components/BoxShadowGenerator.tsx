import ColorPicker from "./common/ColorPicker";
import MLegacyCard from "./layout/MLegacyCard";
import ListBoxShadow from "./list-box-shadow/ListBoxShadow";
import { Checkbox, RangeSlider } from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { RGBColor } from "react-color";

const BoxShadowGenerator = () => {
  const [color, setColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const initValue = {
    shiftRight: 0,
    shiftDown: 0,
    spread: 3,
    blur: 5,
    opacity: 20,
    inset: false,
  };
  const [rangeValues, setRangeValues] = useState<{
    shiftRight: number;
    shiftDown: number;
    spread: number;
    blur: number;
    opacity: number;
    inset: boolean;
  }>(initValue);
  const handleRangeSliderChange = useCallback(
    (value: number, id: string) =>
      setRangeValues({ ...rangeValues, [id]: value }),
    []
  );
  const handleReset = useCallback((id) => {
    setRangeValues({ ...rangeValues, [id]: initValue[id] });
  }, []);

  return (
    <>
      <MLegacyCard title="Box-Shadow CSS Generator">
        <RangeSlider
          id="shiftRight"
          output
          label="Shift right"
          min={-50}
          max={50}
          value={rangeValues.shiftRight}
          onChange={(e) => handleRangeSliderChange(e, "shiftRight")}
          suffix={
            <ResetMinor
              className="cursor-pointer ml-2 w-6 h-6"
              onClick={() => handleReset("shiftRight")}
            />
          }
        />
        <RangeSlider
          id="shiftDown"
          output
          label="Shift down"
          min={-50}
          max={50}
          value={rangeValues.shiftDown}
          onChange={(e) => handleRangeSliderChange(e, "shiftDown")}
          suffix={
            <ResetMinor
              className="cursor-pointer ml-2 w-6 h-6"
              onClick={() => handleReset("shiftDown")}
            />
          }
        />
        <RangeSlider
          id="spread"
          output
          label="Spread"
          min={0}
          max={100}
          value={rangeValues.spread}
          onChange={(e) => handleRangeSliderChange(e, "spread")}
          suffix={
            <ResetMinor
              className="cursor-pointer ml-2 w-6 h-6"
              onClick={() => handleReset("spread")}
            />
          }
        />
        <RangeSlider
          id="blur"
          output
          label="Blur"
          min={0}
          max={100}
          value={rangeValues.blur}
          onChange={(e) => handleRangeSliderChange(e, "blur")}
          suffix={
            <ResetMinor
              className="cursor-pointer ml-2 w-6 h-6"
              onClick={() => handleReset("blur")}
            />
          }
        />
        <RangeSlider
          id="opacity"
          output
          label="Opacity"
          min={0}
          max={100}
          value={rangeValues.opacity}
          onChange={(e) => handleRangeSliderChange(e, "opacity")}
          suffix={
            <ResetMinor
              className="cursor-pointer ml-2 w-6 h-6"
              onClick={() => handleReset("opacity")}
            />
          }
        />
        <Checkbox
          label="Inset"
          checked={rangeValues.inset}
          onChange={(e) => handleRangeSliderChange(e, "inset")}
        />
        <ColorPicker
          color={color}
          setColor={(color) => {
            setColor(color);
          }}
        />
        <div className="my-2 w-full h-3 border-t-2"></div>
        <ListBoxShadow />
      </MLegacyCard>
    </>
  );
};
export default BoxShadowGenerator;
