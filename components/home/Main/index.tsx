import Menu from "./Menu";
import Welcome from "./Welcome";
import MessageList from "./MessageList"
import ChatInput from "./ChatInput";

export default function Main() {
  return (
    <div className="flex-1 relative">
      <main className="overflow-y-auto w-full h-full flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
        <Menu />
        {/* <Welcome /> */}
        <MessageList />
        <ChatInput />
      </main>
    </div>
  );
}
