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
const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    // Adding dragging class to item after a delay
    setTimeout(() => item.classList.add("dragging"), 0);
  });
  // Removing dragging class from item on dragend event
  item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  // Getting all items except currently dragging and making array of them
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  // Finding the sibling after which the dragging item should be placed
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  // Inserting the dragging item before the found sibling
  sortableList.insertBefore(draggingItem, nextSibling);
};

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", (e) => e.preventDefault());
const ListBoxShadow = () => {
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
  const [test, setTest] = useState(["0", "1", "2", "3"]);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const handleAddNew = () => {
    setListBoxShadow([...listBoxShadow, initValues]);
  };
  const handleSort = () => {
    console.log("dragItem", dragItem.current);
    console.log("dragOverItem", dragOverItem.current);
    const draftList = [...test];
    const draggedItem = draftList.splice(dragItem.current, 1)[0];
    console.log("draggedItem", draggedItem);
    draftList.splice(dragOverItem.current, 0, draggedItem);
    dragItem.current = null;
    dragOverItem.current = null;
    setTest(draftList);
  };
  return (
    <>
      <Button onClick={handleAddNew}>ADD LAYER</Button>

      <ul className="sortable-list mt-5">
        {/*{listBoxShadow.map((item, index) => (*/}
        {/*    <li*/}
        {/*        draggable={true}*/}
        {/*        key={index}*/}
        {/*        className="mt-1 bg-slate-100 rounded-md "*/}
        {/*        onDragStart={() => (dragItem.current = index)}*/}
        {/*        onDragEnter={() => (dragOverItem.current = index)}*/}
        {/*        onDragEnd={handleSort}*/}
        {/*        onDragOver={(e) => e.preventDefault()}*/}
        {/*    >*/}
        {/*      <div className="details flex px-3 py-2 w-full h-11 border rounded-md ">*/}
        {/*        <DragHandleMinor />*/}
        {/*        <span className="grow px-3 py-1">{`${item.boxShadow.shiftRight}px ${item.boxShadow.shiftDown}px ${item.boxShadow.blur}px ${item.boxShadow.spread}px rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${item.rgba.a})`}</span>*/}
        {/*        <EditMinor />*/}
        {/*        <DeleteMinor />*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {test.map((item, index) => (
          <li
            draggable={true}
            key={index}
            className="mt-1 bg-slate-100 rounded-md "
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="details flex px-3 py-2 w-full h-11 border rounded-md ">
              <DragHandleMinor />
              <span>{item}</span>
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
