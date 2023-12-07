import "../template/index.scss";
import { Button } from "@shopify/polaris";
import {
  EditMinor,
  DeleteMinor,
  DragHandleMinor,
} from "@shopify/polaris-icons";
import { useRef, useState } from "react";

type CSSCode = {
  rgba: { r: number; g: number; b: number; a: number };
  boxShadow: {
    shiftRight: number;
    shiftDown: number;
    blur: number;
    spread: number;
  };
}[];

const ListBoxShadow = () => {
  // const sortableList = document.querySelector(".sortable-list");
  // const items = sortableList.querySelectorAll(".item");
  //
  // items.forEach((item) => {
  //   item.addEventListener("dragstart", () => {
  //     // Adding dragging class to item after a delay
  //     setTimeout(() => item.classList.add("dragging"), 0);
  //   });
  //   // Removing dragging class from item on dragend event
  //   item.addEventListener("dragend", () => item.classList.remove("dragging"));
  // });
  //
  // const initSortableList = (e) => {
  //   e.preventDefault();
  //   const draggingItem = document.querySelector(".dragging");
  //   // Getting all items except currently dragging and making array of them
  //   let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
  //
  //   // Finding the sibling after which the dragging item should be placed
  //   let nextSibling = siblings.find((sibling) => {
  //     return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  //   });
  //
  //   // Inserting the dragging item before the found sibling
  //   sortableList.insertBefore(draggingItem, nextSibling);
  // };
  //
  // sortableList.addEventListener("dragover", initSortableList);
  // sortableList.addEventListener("dragenter", (e) => e.preventDefault());

  const initValues = {
    rgba: { r: 0, g: 0, b: 0, a: 0.2 },
    boxShadow: {
      shiftRight: 0,
      shiftDown: 0,
      blur: 5,
      spread: 3,
    },
  };
  const [listBoxShadow, setListBoxShadow] = useState<CSSCode>([initValues]);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const sortableList = useRef<any>(null);
  const handleAddNew = () => {
    setListBoxShadow([...listBoxShadow, initValues]);
  };
  const handleOnDragStart = (e, dragItem, index) => {
    dragItem.current = e.target;
    setTimeout(() => {
      e.target.classList.add("dragging");
    });
  };

  const handleSort = (e) => {
    console.log("sortableList", sortableList);
    e.target.classList.remove("dragging");
    const draftList = [...listBoxShadow];

    const dragItemIndex = dragItem.current.className
      .match(/item-\d+/)[0]
      .split("-")[1];
    console.log(dragItemIndex);
    const draggedItem = draftList.splice(dragItemIndex, 1)[0];

    const siblings = draftList.filter(
      (item, index) => index !== dragItem.current
    );

    draftList.splice(dragOverItem.current, 0, draggedItem);
    dragItem.current = null;
    dragOverItem.current = null;
    setListBoxShadow(draftList);
  };
  return (
    <>
      <Button onClick={handleAddNew}>ADD LAYER</Button>

      <ul ref={sortableList} className="sortable-list mt-5">
        {listBoxShadow.map((item, index) => (
          <li
            draggable={true}
            key={index}
            className={`item-${index} mt-1 bg-slate-100 rounded-md `}
            onDragStart={(e) => {
              handleOnDragStart(e, dragItem, index);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              dragOverItem.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="details flex px-3 py-2 w-full h-11 border rounded-md ">
              <DragHandleMinor />
              <span className="grow px-3 py-1">{`${item.boxShadow.shiftRight}px ${item.boxShadow.shiftDown}px ${item.boxShadow.blur}px ${item.boxShadow.spread}px rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${item.rgba.a})`}</span>
              <EditMinor />
              <DeleteMinor />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ListBoxShadow;
