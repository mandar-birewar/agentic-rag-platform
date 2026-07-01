import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ChatBox from "@/components/chat/ChatBox";
import UploadModal from "@/components/upload/UploadModal";
import Toast from "@/components/common/Toast";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const {
    chats,
    activeChatId,
    activeChat,
    messages,
    isLoading,
    error,
    clearError,
    sendMessage,
    startNewChat,
    selectChat,
    deleteChat,
    renameChat,
    stopGenerating,
  } = useChat();

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  function handleUploadComplete({ file }) {
    setTimeout(() => {
      setIsUploadOpen(false);
      sendMessage(
        `I've uploaded "${file.name}". Can you summarize the key points?`
      );
    }, 900);
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={() => {
          startNewChat();
          setIsMobileSidebarOpen(false);
        }}
        onSelectChat={(id) => {
          selectChat(id);
          setIsMobileSidebarOpen(false);
        }}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
        onUploadClick={() => setIsUploadOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <motion.div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          chatTitle={activeChat?.title}
        />

        <ChatBox
          messages={messages}
          isLoading={isLoading}
          onSend={sendMessage}
          onStop={stopGenerating}
          onAttachClick={() => setIsUploadOpen(true)}
        />
      </motion.div>

      <UploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <Toast message={error} onDismiss={clearError} />
    </div>
  );
}
