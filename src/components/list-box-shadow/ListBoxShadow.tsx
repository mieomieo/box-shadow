import "../template/index.scss";
import "./index.scss";
import userdata from "./tempData.json";
import { Button } from "@shopify/polaris";
import {
  EditMinor,
  DeleteMinor,
  DragHandleMinor,
} from "@shopify/polaris-icons";
import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type CSSCode = {
  id: number;
  inset: boolean;
  rgba: { r: number; g: number; b: number; a: number };
  boxShadow: {
    shiftRight: number;
    shiftDown: number;
    blur: number;
    spread: number;
  };
}[];
type Props = {
  hasInset: boolean;
};
const ListBoxShadow = ({ hasInset }: Props) => {
  const initValues = {
    id: 0,
    inset: false,
    rgba: { r: 0, g: 0, b: 0, a: 0.2 },
    boxShadow: {
      shiftRight: 0,
      shiftDown: 0,
      blur: 5,
      spread: 3,
    },
  };
  const [listBoxShadow, setListBoxShadow] = useState<CSSCode>([initValues]);

  const idCounter = useRef(0);

  const handleAddNew = () => {
    idCounter.current += 1;
    setListBoxShadow((prevList) => [
      ...prevList,
      {
        id: idCounter.current,
        inset: false,
        rgba: { r: 0, g: 0, b: 0, a: 0.2 },
        boxShadow: {
          shiftRight: 0,
          shiftDown: 0,
          blur: 5,
          spread: 3,
        },
      },
    ]);
  };
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(listBoxShadow);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setListBoxShadow(tempData);
  };
  const handleDelete = (value) => {
    const tempArr = [...listBoxShadow];
    if (tempArr.length > 1) {
      const newListBoxShadow = tempArr.filter((item) => item.id !== value);
      setListBoxShadow(newListBoxShadow);
    }
  };
  return (
    <>
      <Button onClick={handleAddNew}>ADD LAYER</Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="drag-table mt-3 w-full">
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody ref={provider.innerRef} {...provider.droppableProps}>
                {listBoxShadow?.map((item, index) => (
                  <Draggable
                    key={listBoxShadow[index].id.toString()}
                    draggableId={listBoxShadow[index].id.toString()}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td className="flex" {...provider.dragHandleProps}>
                          <div className="flex px-3 py-2 w-full h-11 border rounded-md">
                            <DragHandleMinor />
                            <span className="grow px-3 py-1 ">
                              {hasInset && "inset"}{" "}
                              {`${item.boxShadow.shiftRight}px ${item.boxShadow.shiftDown}px ${item.boxShadow.blur}px ${item.boxShadow.spread}px rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${item.rgba.a})`}
                            </span>
                            <EditMinor />
                            <DeleteMinor
                              onClick={() => handleDelete(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </>
  );
};
export default ListBoxShadow;
