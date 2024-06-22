import Button from "@/components/common/Button";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill, PiStopBold } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import TextareaAutoSize from "react-textarea-autosize";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message, MessageRequestBody } from "@/types/chat";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function ChatInput() {
  const [messageText, setMessageText] = useState("");
  // 由于发送的消息中需要附带历史消息，所以需要在全局状态中读取消息列表
  const {
    state: { messageList, currentModel, streamingId },
    dispatch,
  } = useAppContext();
  // useRef也可以用于维护变量，和useState不同的是，useState的数据变化会引发重新渲染
  // useRef的数据变化不会重新渲染，并且渲染前后返回的是同一个对象（useState不是），所以总是能得到最新的值
  const stopRef = useRef(false);

  async function send() {
    // 输入的消息对象
    const message: Message = {
      id: uuidv4(),
      role: "user",
      content: messageText,
    };
    // dispatch更新函数，把当前消息添加到消息列表（全局状态）中
    dispatch({ type: ActionType.ADD_MESSAGE, message });
    const messages = messageList.concat([message]);
    doSend(messages);
  }

  async function resend() {
    const messages = [...messageList];
    // 消息列表中最后一条消息是否是回复消息，是就删除
    if (
      messages.length !== 0 &&
      messages[messages.length - 1].role === "assistant"
    ) {
      dispatch({
        type: ActionType.REMOVE_MESSAGE,
        message: messages[messages.length - 1],
      });
      // 临时消息列表也需要删除
      messages.splice(messages.length - 1, 1);
    }
    doSend(messages);
  }

  async function doSend(messages: Message[]) {
    const body: MessageRequestBody = { messages, model: currentModel };

    setMessageText("");
    // 控制器用于中止请求
    const controller = new AbortController();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    if (!response.body) {
      console.log("body error");
      return;
    }
    // 把服务端的消息添加到消息列表中
    const responseMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "",
    };
    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage });
    // 接收消息时，更改状态值为接收消息的id
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: responseMessage.id,
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    // 读取的过程中实时更新界面状态，实现逐字回复
    let done = false;
    let content = "";
    while (!done) {
      // 根据表示位决定是否停止读取
      if (stopRef.current) {
        stopRef.current = false;
        controller.abort();
        break;
      }
      const result = await reader.read();
      done = result.done;
      const chunk = decoder.decode(result.value);
      content += chunk;
      dispatch({
        type: ActionType.UPDATE_MESSAGE,
        // 其他东西不变，只更新消息的内容
        message: { ...responseMessage, content },
      });
    }
    // 接收完成后重置状态值
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: "",
    });
  }

  return (
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
        {messageList.length !== 0 &&
          // 根据是否正在生成消息显示不同按钮
          (streamingId !== "" ? (
            <Button
              icon={PiStopBold}
              onClick={() => {
                stopRef.current = true;
              }}
              variant="primary"
              className="font-medium"
            >
              停止生成
            </Button>
          ) : (
            <Button
              icon={MdRefresh}
              onClick={() => {
                resend();
              }}
              variant="primary"
              className="font-medium"
            >
              重新生成
            </Button>
          ))}
        <div className="flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4">
          <div className="mx-3 mb-2.5 text-primary-500">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0"
            placeholder="输入一条消息..."
            rows={1}
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
          />
          <Button
            className="mx-3 !rounded-lg"
            icon={FiSend}
            // 消息内容为空或者正在生成回复时，禁止输入新消息
            disabled={messageText.trim() === "" || streamingId !== ""}
            variant="primary"
            onClick={() => {
              stopRef.current = true;
            }}
            onClick={send}
          />
        </div>
        <footer className="text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6">
          ©️{new Date().getFullYear()}&nbsp;{" "}
          <a
            className="font-medium py-[1px] border-b border-dotted border-black/60 hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0 animated-underline"
            href="https://x.zhixing.co"
            target="_blank"
          >
            知行小课
          </a>
          .&nbsp;基于第三方提供的接口
        </footer>
      </div>
    </div>
  );
}
