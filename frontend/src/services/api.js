import axios from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "@/utils/constants";

/**
 * Single Axios instance for the whole app. Every request to the
 * FastAPI backend should go through this client so headers, timeouts,
 * and error handling stay consistent.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

/**
 * Normalize Axios errors into a consistent shape the UI can render
 * directly in a toast, regardless of whether it was a network failure,
 * a timeout, or a backend error response.
 */
function normalizeError(error) {
  if (axios.isCancel(error)) {
    return { message: "Request cancelled.", code: "CANCELLED" };
  }
  if (error.code === "ECONNABORTED") {
    return {
      message: "The request timed out. Please try again.",
      code: "TIMEOUT",
    };
  }
  if (!error.response) {
    return {
      message: "Can't reach the server. Check your connection.",
      code: "NETWORK_ERROR",
    };
  }
  const status = error.response.status;
  const backendMessage =
    error.response.data?.message || error.response.data?.detail;

  if (status >= 500) {
    return {
      message: backendMessage || "Something went wrong on our end.",
      code: "SERVER_ERROR",
      status,
    };
  }
  return {
    message: backendMessage || "That request couldn't be completed.",
    code: "CLIENT_ERROR",
    status,
  };
}

/**
 * Send a chat message and return the assistant's response text.
 */
export async function sendChatMessage(message, signal) {
  try {
    const { data } = await apiClient.post(
      "/chat",
      { message },
      { signal }
    );
    return data.response;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Upload a PDF file with progress tracking.
 * onProgress receives an integer percentage (0-100).
 */
export async function uploadPdf(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await apiClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (!onProgress || !event.total) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      },
    });
    return data.message;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Lightweight health check used to drive the connection indicator.
 * Falls back gracefully if the backend has no dedicated /health route.
 */
export async function checkConnection() {
  try {
    await apiClient.get("/health", { timeout: 5000 });
    return true;
  } catch {
    try {
      // Some backends don't expose /health — a reachable root is enough
      // signal that the server process is up.
      await apiClient.get("/", { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
