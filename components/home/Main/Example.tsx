import { MdOutlineTipsAndUpdates } from "react-icons/md";
import exapmles from "@/data/examples.json";
import { useState, useMemo } from "react";
import Button from "@/components/common/Button";

// 使用空标签作为根元素，因为要返回多个组件，但不想嵌套多余的父元素
export default function () {
  // const [showFull, setShowFull] = useState(false);
  // const list = useMemo(() => {
  //   if (showFull) {
  //     return exapmles;
  //   } else {
  //     return exapmles.slice(0, 15);
  //   }
  // });
  return (
    <>
      <div className="mt-20 mb-4 text-4xl">

        <MdOutlineTipsAndUpdates />
      </div>
      <ul className="flex justify-center flex-wrap gap-3.5">
        {/* {list.map((item) => {
          return (
            <li key={item.act}>
              <button>{item.act}</button>
            </li>
          );
        })} */}
      </ul>
      {/* {!showFull && (
        <>
          <p className="p-2">...</p>
          <div className="flex items-center w-full space-x-2">
            <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
            <Button
              variant="text"
              onClick={() => {
                setShowFull(true);
              }}
            >
              显示全部
            </Button>
            <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
          </div>
        </>
      )} */}
    </>
  );
}
