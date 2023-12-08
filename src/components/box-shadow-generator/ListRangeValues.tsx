import { BoxShadowContext } from "../../BoxShadowContext";
import ColorPicker from "../common/ColorPicker";
import "./index.scss";
import { Checkbox, RangeSlider } from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { useContext } from "react";
import { RGBColor } from "react-color";

type Props = {
  index: number;
};
const ListRangeValues = ({ index }: Props) => {
  // console.log("index", index);
  const context = useContext(BoxShadowContext);
  const { listBoxShadow, setListBoxShadow } = context;
  const data = listBoxShadow[index];
  const initValue = {
    shiftRight: 0,
    shiftDown: 0,
    spread: 3,
    blur: 5,
    opacity: 20,
    inset: false,
  };
  const handleRangeChange = (value: number, key: string) => {
    const updateListBoxShadow = [...listBoxShadow];
    const updateBoxShadow = { ...updateListBoxShadow[index].boxShadow };

    updateBoxShadow[key] = value;

    updateListBoxShadow[index] = {
      ...updateListBoxShadow[index],
      boxShadow: updateBoxShadow,
    };

    setListBoxShadow(updateListBoxShadow);
  };

  const handleReset = (key: string) => {
    const updateListBoxShadow = [...listBoxShadow];
    const updateBoxShadow = { ...updateListBoxShadow[index].boxShadow };

    updateBoxShadow[key] = initValue[key];

    updateListBoxShadow[index] = {
      ...updateListBoxShadow[index],
      boxShadow: updateBoxShadow,
    };

    setListBoxShadow(updateListBoxShadow);
  };
  const handlePickColor = (color: RGBColor) => {
    const updateListColor = [...listBoxShadow];
    updateListColor[index] = {
      ...updateListColor[index],
      rgba: color,
    };
    setListBoxShadow(updateListColor);
  };
  return (
    <>
      <RangeSlider
        id="shiftRight"
        output
        label="Shift right"
        min={-50}
        max={50}
        value={data.boxShadow.shiftRight}
        onChange={(e) => handleRangeChange(e, "shiftRight")}
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
        value={data.boxShadow.shiftDown}
        onChange={(e) => handleRangeChange(e, "shiftDown")}
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
        value={data.boxShadow.spread}
        onChange={(e) => handleRangeChange(e, "spread")}
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
        value={data.boxShadow.blur}
        onChange={(e) => handleRangeChange(e, "blur")}
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
        value={data.boxShadow.opacity}
        onChange={(e) => handleRangeChange(e, "opacity")}
        suffix={
          <ResetMinor
            className="cursor-pointer ml-2 w-6 h-6"
            onClick={() => handleReset("opacity")}
          />
        }
      />
      <Checkbox
        label="Inset"
        checked={data.boxShadow.inset}
        onChange={(e) => handleRangeChange(e, "inset")}
      />
      <ColorPicker
        color={data.rgba}
        setColor={(color) => {
          handlePickColor(color);
        }}
      />
    </>
  );
};
export default ListRangeValues;
