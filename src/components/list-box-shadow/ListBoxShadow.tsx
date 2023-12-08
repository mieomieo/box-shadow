import { BoxShadowContext } from "../../BoxShadowContext";
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
  console.log(context.listBoxShadow);
  const idCounter = useRef(0);

  const handleAddNew = () => {
    idCounter.current += 1;
    context.setListBoxShadow((prevList) => [
      ...prevList,
      {
        id: idCounter.current,
        rgba: { r: 0, g: 0, b: 0, a: 0.2 },
        boxShadow: {
          shiftRight: 0,
          shiftDown: 0,
          blur: 5,
          spread: 3,
          inset: false,
        },
      },
    ]);
  };
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const tempData = Array.from(context.listBoxShadow);
    const [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    context.setListBoxShadow(tempData);
  };
  const handleDelete = (value) => {
    const tempArr = [...context.listBoxShadow];
    if (tempArr.length > 1) {
      const newListBoxShadow = tempArr.filter((item) => item.id !== value);
      context.setListBoxShadow(newListBoxShadow);
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
                {context.listBoxShadow?.map((item, index) => (
                  <Draggable
                    key={context.listBoxShadow[index].id.toString()}
                    draggableId={context.listBoxShadow[index].id.toString()}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td className="flex mt-2 ">
                          <div
                            {...provider.dragHandleProps}
                            className="flex py-1 w-full h-11 border rounded-md select-none bg-cyan-200"
                          >
                            <DragHandleMinor />
                            <span className="grow px-3 py-1 text-lg  ">
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
