import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  PlusCircle,
  Settings,
  Pencil,
  Trash2,
  Check,
  X,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import UploadButton from "@/components/upload/UploadButton";
import { formatRelativeTime, cn } from "@/utils/helpers";
import { APP_NAME } from "@/utils/constants";

function ChatHistoryItem({ chat, isActive, onSelect, onRename, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(chat.title);

  function commitRename() {
    onRename(chat.id, draftTitle);
    setIsEditing(false);
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-foreground"
          : "text-muted hover:bg-white/5 hover:text-foreground"
      )}
    >
      {isEditing ? (
        <>
          <input
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitRename();
              if (e.key === "Escape") setIsEditing(false);
            }}
            className="min-w-0 flex-1 rounded bg-white/5 px-1.5 py-0.5 text-xs text-foreground focus:outline-none"
          />
          <button onClick={commitRename} aria-label="Save name" className="shrink-0 text-success">
            <Check size={13} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            aria-label="Cancel rename"
            className="shrink-0 text-muted hover:text-foreground"
          >
            <X size={13} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => onSelect(chat.id)}
            className="min-w-0 flex-1 truncate text-left"
            title={chat.title}
          >
            {chat.title}
          </button>
          <span className="shrink-0 text-[10px] text-muted/70 group-hover:hidden">
            {formatRelativeTime(chat.updatedAt)}
          </span>
          <div className="hidden shrink-0 items-center gap-1 group-hover:flex">
            <button
              onClick={() => {
                setDraftTitle(chat.title);
                setIsEditing(true);
              }}
              aria-label="Rename chat"
              className="rounded p-0.5 text-muted hover:text-foreground"
            >
              <Pencil size={12} />
            </button>
            <button
              onClick={() => onDelete(chat.id)}
              aria-label="Delete chat"
              className="rounded p-0.5 text-muted hover:text-danger"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onUploadClick,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <motion.aside
        animate={{ width: isCollapsed ? 72 : 268 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r border-border bg-sidebar lg:relative lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-3.5">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles size={15} />
            </div>
            {!isCollapsed && (
              <span className="truncate text-sm font-semibold text-foreground">
                {APP_NAME}
              </span>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar"
            className="hidden shrink-0 rounded-md p-1 text-muted hover:text-foreground lg:flex"
          >
            {isCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <div className="flex flex-col gap-2 px-3 py-3">
          <button
            onClick={onNewChat}
            className={cn(
              "flex items-center gap-2.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover",
              isCollapsed && "justify-center px-2"
            )}
          >
            <PlusCircle size={16} />
            {!isCollapsed && "New chat"}
          </button>

          {!isCollapsed ? (
            <UploadButton onClick={onUploadClick} />
          ) : (
            <button
              onClick={onUploadClick}
              aria-label="Upload PDF"
              className="flex items-center justify-center rounded-lg border border-border bg-white/[0.02] px-2 py-2 text-muted hover:text-foreground"
            >
              <Sparkles size={15} className="opacity-0" />
            </button>
          )}
        </div>

        {!isCollapsed && (
          <div className="scrollbar-thin flex-1 overflow-y-auto px-2 py-1">
            <p className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted/70">
              Recent
            </p>
            <div className="flex flex-col gap-0.5">
              {chats.length === 0 && (
                <p className="px-2.5 py-2 text-xs text-muted/60">
                  No conversations yet
                </p>
              )}
              {chats.map((chat) => (
                <ChatHistoryItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeChatId}
                  onSelect={onSelectChat}
                  onRename={onRenameChat}
                  onDelete={onDeleteChat}
                />
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border px-3 py-3">
          <button
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground",
              isCollapsed && "justify-center"
            )}
          >
            <Settings size={16} />
            {!isCollapsed && "Settings"}
          </button>
          <div
            className={cn(
              "mt-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2",
              isCollapsed && "justify-center"
            )}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 text-xs font-semibold text-white">
              U
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">
                  User
                </p>
                <p className="truncate text-[11px] text-muted">Free plan</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
