import { useState, useCallback, useRef, useEffect } from "react";
import { sendChatMessage } from "@/services/api";
import { ROLES } from "@/utils/constants";
import { generateId, deriveChatTitle } from "@/utils/helpers";

const HISTORY_STORAGE_KEY = "prodigy-ai:chats";

function loadChatsFromStorage() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistChatsToStorage(chats) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(chats));
  } catch {
    // Storage can fail (quota, private mode) — chat still works in-memory.
  }
}

/**
 * Owns all chat state: the active conversation's messages, the list of
 * past chats shown in the sidebar, and the request lifecycle for sending
 * a message to the FastAPI /chat endpoint.
 */
export function useChat() {
  const [chats, setChats] = useState(loadChatsFromStorage);
  const [activeChatId, setActiveChatId] = useState(
    () => loadChatsFromStorage()[0]?.id ?? null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    persistChatsToStorage(chats);
  }, [chats]);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;
  const messages = activeChat?.messages ?? [];

  const clearError = useCallback(() => setError(null), []);

  const startNewChat = useCallback(() => {
    setActiveChatId(null);
    setError(null);
  }, []);

  const selectChat = useCallback((chatId) => {
    setActiveChatId(chatId);
    setError(null);
  }, []);

  const deleteChat = useCallback(
    (chatId) => {
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      if (chatId === activeChatId) setActiveChatId(null);
    },
    [activeChatId]
  );

  const renameChat = useCallback((chatId, newTitle) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, title: newTitle.trim() || c.title } : c
      )
    );
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);

      const userMessage = {
        id: generateId("msg"),
        role: ROLES.USER,
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      let chatId = activeChatId;

      setChats((prev) => {
        if (chatId) {
          return prev.map((c) =>
            c.id === chatId
              ? { ...c, messages: [...c.messages, userMessage] }
              : c
          );
        }
        chatId = generateId("chat");
        const newChat = {
          id: chatId,
          title: deriveChatTitle(trimmed),
          messages: [userMessage],
          updatedAt: new Date().toISOString(),
        };
        return [newChat, ...prev];
      });

      setActiveChatId((current) => current ?? chatId);
      setIsLoading(true);

      abortControllerRef.current = new AbortController();

      try {
        const responseText = await sendChatMessage(
          trimmed,
          abortControllerRef.current.signal
        );

        const assistantMessage = {
          id: generateId("msg"),
          role: ROLES.ASSISTANT,
          content: responseText,
          createdAt: new Date().toISOString(),
        };

        setChats((prev) =>
          prev.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: [...c.messages, assistantMessage],
                  updatedAt: new Date().toISOString(),
                }
              : c
          )
        );
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [activeChatId, isLoading]
  );

  const stopGenerating = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  }, []);

  return {
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
  };
}
