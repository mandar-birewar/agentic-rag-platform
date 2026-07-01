import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function ChatBox({
  messages,
  isLoading,
  onSend,
  onStop,
  onAttachClick,
  prefillValue,
}) {
  return (
    <div className="flex h-full flex-col">
      <MessageList
        messages={messages}
        isLoading={isLoading}
        onSuggestionClick={onSend}
      />
      <ChatInput
        onSend={onSend}
        onStop={onStop}
        onAttachClick={onAttachClick}
        isLoading={isLoading}
        initialValue={prefillValue}
      />
    </div>
  );
}
