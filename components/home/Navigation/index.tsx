"use client";

import { useAppContext } from "@/components/AppContext";
import ChatList from "./ChatList";
import Menubar from "./MenuBar";
import Toolbar from './Toolbar'

export default function Navigation() {
  const {
    state: { displayNavigation },
  } = useAppContext();
  return (
    <div
      className={`${
        displayNavigation ? "" : "hidden"
      } flex flex-col dark relative h-full w-[260px] bg-gray-900 text-gray-300 p-2`}
    >
      <Menubar />
      <ChatList />
      <Toolbar />
    </div>
  );
}
