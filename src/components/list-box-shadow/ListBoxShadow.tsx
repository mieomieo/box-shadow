import "../template/index.scss";
import "./index.scss";
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
  const [test, setTest] = useState([1, 2, 3]);

  const dragItemIndex = useRef<any>(null);
  const dragOverItemIndex = useRef<any>(null);
  const sortableList = useRef<any>(null);
  const draggingItem = useRef<any>(null);

  const handleAddNew = () => {
    setListBoxShadow([...listBoxShadow, initValues]);
  };
  const handleOnDragStart = (e, dragItem, index) => {
    // console.log("sortableList", sortableList.current);
    dragItem.current = index;
    setTimeout(() => {
      e.target.classList.add("dragging");
    });
  };

  const handleSortCSS = (e) => {
    const siblings = [
      ...sortableList.current.querySelectorAll(".item:not(.dragging)"),
    ];
    console.log("siblings", siblings);
    const nextSibling = siblings.find((sibling) => {
      const result = e.clientY <= sibling.offsetTop + sibling.offsetHeight;
      console.log(e.clientY);
      console.log("result", result);
      return result;
    });
    console.log("nextsibling", nextSibling);
    sortableList.current.insertBefore(draggingItem.current, nextSibling);
  };
  const handleSort = (e) => {
    e.preventDefault();

    const draftList = [...test];

    const draggedItemIndex = draftList.splice(dragItemIndex.current, 1)[0];

    draftList.splice(dragOverItemIndex.current, 0, draggedItemIndex);
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
    e.target.classList.remove("dragging");
    setTest(draftList);
  };
  return (
    <>
      <Button onClick={handleAddNew}>ADD LAYER</Button>

      <ul ref={sortableList} className="sortable-list mt-5">
        {/*{listBoxShadow.map((item, index) => (*/}
        {/*  <li*/}
        {/*    draggable={true}*/}
        {/*    key={index}*/}
        {/*    className={`item-${index} mt-1 bg-slate-100 rounded-md `}*/}
        {/*    onDragStart={(e) => {*/}
        {/*      handleOnDragStart(e, dragItem, index);*/}
        {/*    }}*/}
        {/*    onDragEnter={(e) => {*/}
        {/*      e.preventDefault();*/}
        {/*      dragOverItem.current = index;*/}
        {/*    }}*/}
        {/*    onDragEnd={handleSort}*/}
        {/*    onDragOver={(e) => e.preventDefault()}*/}
        {/*  >*/}
        {/*    <div className="details flex px-3 py-2 w-full h-11 border rounded-md ">*/}
        {/*      <DragHandleMinor />*/}
        {/*      <span className="grow px-3 py-1">{`${item.boxShadow.shiftRight}px ${item.boxShadow.shiftDown}px ${item.boxShadow.blur}px ${item.boxShadow.spread}px rgba(${item.rgba.r}, ${item.rgba.g}, ${item.rgba.b}, ${item.rgba.a})`}</span>*/}
        {/*      <EditMinor />*/}
        {/*      <DeleteMinor />*/}
        {/*    </div>*/}
        {/*  </li>*/}
        {/*))}*/}
        {test.map((item, index) => (
          <li
            ref={draggingItem}
            draggable={true}
            key={index}
            className={`item item-${index} mt-1 bg-slate-100 rounded-md `}
            onDragStart={(e) => {
              handleOnDragStart(e, dragItemIndex, index);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              dragOverItemIndex.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={handleSortCSS}
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
