import { BoxShadowContext, initValues } from "../../BoxShadowContext";
import "../template/index.scss";
import "./index.scss";
import { Button } from "@shopify/polaris";
import {
  DeleteMinor,
  DragHandleMinor,
  EditMinor,
} from "@shopify/polaris-icons";
import { useContext, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ListBoxShadow = () => {
  const context = useContext(BoxShadowContext);
  const { listBoxShadow, setListBoxShadow } = context;
  console.log(listBoxShadow);
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
                        <td className="flex mt-2 ">
                          <div
                            {...provider.dragHandleProps}
                            className="flex py-1 w-full h-10 border rounded-md select-none bg-cyan-200"
                          >
                            <DragHandleMinor />
                            <div className="grow  py-1 text-lg text-base ">
                              {item.boxShadow.inset && "inset"}{" "}
                              {`${item.boxShadow.shiftRight}px ${item.boxShadow.shiftDown}px ${item.boxShadow.blur}px ${item.boxShadow.spread}px rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${item.rgba.a})`}
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
    </>
  );
};
export default ListBoxShadow;
