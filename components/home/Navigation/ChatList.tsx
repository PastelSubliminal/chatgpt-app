import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import { useState, useMemo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
import ChatItem from "./ChatItem";

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: "1",
      title: "title1",
      updateTime: Date.now(),
    },
    {
      id: "2",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "3",
      title: "title3",
      updateTime: Date.now() + 2,
    },
    {
      id: "4",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "5",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "6",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "7",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "8",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "9",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "10",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "11",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "12",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
    {
      id: "13",
      title: "title22222222222222222",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "14",
      title: "title22222222222222222",
      updateTime: Date.now() + 1,
    },
  ]);
  // 用于保存当前选择的对话
  const [selectedChat, setSelectedChat] = useState<Chat>();
  // 缓存分组之后的对话列表，有改变时才重新计算分组
  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [ChatList]);
  return (
    <div className="flex-1 mh-[48px] mt-2 flex flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">
              {date}
            </div>
            <ul>
              {list.map((item) => {
                const selected = selectedChat?.id === item.id;
                return (
                  <ChatItem
                    key={item.id}
                    item={item}
                    selected={selected}
                    onSelected={(chat) => {
                      setSelectedChat(chat);
                    }}
                  />
                );
              })}
              {/* {list.map((item) => {
                const selected = selectedChat?.id === item.id;
                return (
                  <li
                    onClick={() => {
                      setSelectedChat(item);
                    }}
                    key={item.id}
                    className={`group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${
                      selected ? "bg-gray-800" : ""
                    }`}
                  >
                    <div>
                      <PiChatBold />
                    </div>
                    <div className="relative flex-1 whitespace-nowrap overflow-hidden">
                      {item.title}
                      <span
                        className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 bg-grandient-to-l ${
                          selected ? "bg-gray-800" : "from-gray-900"
                        }`}
                      ></span>
                    </div>
                  </li>
                );
              })} */}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
