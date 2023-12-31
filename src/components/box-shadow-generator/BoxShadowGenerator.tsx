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
import { useContext, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const BoxShadowGenerator = () => {
  const { selectedItemIndex, setSelectedItemIndex } =
    useContext(BoxShadowContext);

  console.log("selectedItemIndex:", selectedItemIndex);
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
    console.log("destination:", e.destination.index);
    console.log("source:", e.source.index);
    const tempData = [...listBoxShadow];
    const [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);

    if (selectedItemIndex == e.source.index) {
      setSelectedItemIndex(e.destination.index);
    } else if (
      e.source.index <= selectedItemIndex &&
      selectedItemIndex <= e.destination.index
    ) {
      setSelectedItemIndex(selectedItemIndex - 1);
    } else if (
      e.source.index >= selectedItemIndex &&
      selectedItemIndex >= e.destination.index
    ) {
      setSelectedItemIndex(selectedItemIndex + 1);
    }
    setListBoxShadow(tempData);
  };
  const handleDelete = (id) => {
    const tempArr = [...listBoxShadow];
    if (tempArr.length > 1) {
      const newListBoxShadow = tempArr.filter((item) => item.id !== id);
      setListBoxShadow(newListBoxShadow);
    }
  };

  return (
    <>
      <MLegacyCard title="Box-Shadow CSS Generator">
        <ListRangeValues index={selectedItemIndex} />
        <div className="my-2 w-full h-3 border-t-2"></div>
        <Button onClick={handleAddNew}>Add layer</Button>
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
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                        >
                          <td className="flex mt-2 ">
                            <div
                              className={`flex px-2 py-1 text-sm font-bold w-full h-9 border rounded-md select-none ${
                                index === selectedItemIndex
                                  ? "selected-item"
                                  : ""
                              }`}
                              {...provider.dragHandleProps}
                            >
                              {index === selectedItemIndex ? (
                                <EditMinor />
                              ) : (
                                <DragHandleMinor />
                              )}

                              <div
                                onClick={() => {
                                  setSelectedItemIndex(index);
                                }}
                                className="grow pl-2 py-1    "
                              >
                                {item.boxShadow.inset && "inset"}{" "}
                                {`${item.boxShadow.shiftRight}px ${
                                  item.boxShadow.shiftDown
                                }px ${item.boxShadow.blur}px ${
                                  item.boxShadow.spread
                                }px rgba (${item.rgba.r}, ${item.rgba.g}, ${
                                  item.rgba.b
                                }, ${item.boxShadow.opacity / 100})`}
                              </div>

                              <DeleteMinor
                                onClick={() => {
                                  if (selectedItemIndex > 0) {
                                    setSelectedItemIndex(selectedItemIndex - 1);
                                  }
                                  handleDelete(item.id);
                                }}
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
