import { BoxShadowContext, initValues } from "../../BoxShadowContext";
import MLegacyCard from "../layout/MLegacyCard";
import "../template/index.scss";
import ListRangeValues from "./ListRangeValues";
import "./index.scss";
import { Button } from "@shopify/polaris";
import {
  DeleteMinor,
  DragHandleMinor,
  EditMinor,
} from "@shopify/polaris-icons";
import { useContext, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const BoxShadowGenerator = () => {
  const context = useContext(BoxShadowContext);
  const { listBoxShadow, setListBoxShadow } = context;

  const idCounter = useRef(0);
  const handleAddNew = () => {
    idCounter.current += 1;
    setListBoxShadow((prevList) => [
      ...prevList,
      { ...initValues, id: idCounter.current },
    ]);
  };
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const tempData = Array.from(listBoxShadow);
    const [source_data] = tempData.splice(e.source.index, 1);
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
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  return (
    <>
      <MLegacyCard title="Box-Shadow CSS Generator">
        <ListRangeValues index={selectedItemIndex} />
        <div className="my-2 w-full h-3 border-t-2"></div>
        <Button onClick={handleAddNew}>ADD LAYER</Button>
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className="drag-table mt-3 w-full">
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <tbody ref={provider.innerRef} {...provider.droppableProps}>
                  {listBoxShadow.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provider) => (
                        <tr
                          onClick={() => {
                            console.log("here");
                            setSelectedItemIndex(index);
                          }}
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                        >
                          <td className="flex mt-2 ">
                            <div
                              {...provider.dragHandleProps}
                              className="flex py-1 w-full h-10 border rounded-md select-none "
                            >
                              <DragHandleMinor />
                              <div className="grow  py-1 text-lg text-base ">
                                {item.boxShadow.inset && "inset"}{" "}
                                {`${item.boxShadow.shiftRight}px ${
                                  item.boxShadow.shiftDown
                                }px ${item.boxShadow.blur}px ${
                                  item.boxShadow.spread
                                }px rgba(${item.rgba.r}, ${item.rgba.g}, ${
                                  item.rgba.b
                                }, ${item.boxShadow.opacity / 100})`}
                              </div>
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
      </MLegacyCard>
    </>
  );
};
export default BoxShadowGenerator;
