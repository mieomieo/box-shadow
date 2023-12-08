import { BoxShadowContext } from "../BoxShadowContext";
import MLegacyCard from "./layout/MLegacyCard";
import { Button, Frame, Icon, Toast } from "@shopify/polaris";
import { ClipboardMinor } from "@shopify/polaris-icons";
import { useCallback, useContext, useState } from "react";

const PreviewCode = () => {
  const { listBoxShadow } = useContext(BoxShadowContext);
  const boxShadowCSS = listBoxShadow
    .map(
      (item) =>
        `rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${
          item.boxShadow.opacity / 100
        }) ${item.boxShadow.shiftRight}px ${item.boxShadow.shiftDown}px ${
          item.boxShadow.blur
        }px ${item.boxShadow.spread}px${item.boxShadow.inset ? " inset" : ""}`
    )
    .join(", \n");
  const cssCode = "box-shadow:" + boxShadowCSS + ";";
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setActive((active) => !active);
  }, []);

  const toastMarkup = active ? (
    <Toast content="Copied to clipboard!" onDismiss={toggleActive} />
  ) : null;
  return (
    <>
      <MLegacyCard title="CSS code">
        <div onClick={toggleActive} className="absolute top-5 right-5">
          <Button
            children={
              <>
                <div className="flex justify-center text-sm">
                  <span className="mr-1">Copy</span>
                  <Icon source={ClipboardMinor} tone="base" />
                </div>
              </>
            }
          ></Button>
        </div>

        <pre>
          <code>{cssCode}</code>
        </pre>
      </MLegacyCard>
      <div className="hidden">
        <Frame>{toastMarkup}</Frame>
      </div>
    </>
  );
};
export default PreviewCode;
