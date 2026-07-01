export const APP_NAME = "Prodigy AI";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const API_TIMEOUT_MS = 30000;

export const ROLES = {
  USER: "user",
  ASSISTANT: "assistant",
};

export const CONNECTION_STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
  CONNECTING: "connecting",
};

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
};

export const MAX_FILE_SIZE_MB = 25;

export const KEYBOARD_SHORTCUTS = {
  SEND: "Enter",
  NEWLINE: "Shift+Enter",
};

export const EMPTY_STATE_SUGGESTIONS = [
  {
    title: "Summarize a document",
    subtitle: "Upload a PDF and ask for the key takeaways",
  },
  {
    title: "Explain a concept",
    subtitle: "Break down a complex topic into simple terms",
  },
  {
    title: "Check the weather",
    subtitle: "Ask what it's like outside right now",
  },
  {
    title: "Get the latest news",
    subtitle: "Catch up on a topic you care about",
  },
];
