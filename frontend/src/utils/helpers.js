import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a reasonably unique id for client-side entities
 * (messages, chats) before the backend assigns a real one.
 */
export function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Format bytes into a human-readable file size string.
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/**
 * Format a timestamp into a short, readable time (e.g. "2:45 PM").
 */
export function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date instanceof Date ? date : new Date(date));
}

/**
 * Format a timestamp into a relative "time ago" label for chat history.
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const target = date instanceof Date ? date : new Date(date);
  const diffMs = now - target;
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(target);
}

/**
 * Truncate a string to a maximum length, appending an ellipsis.
 */
export function truncate(str, maxLength = 40) {
  if (!str) return "";
  return str.length > maxLength ? `${str.slice(0, maxLength).trim()}…` : str;
}

/**
 * Derive a short chat title from the first user message.
 */
export function deriveChatTitle(message) {
  if (!message) return "New chat";
  const cleaned = message.replace(/\s+/g, " ").trim();
  return truncate(cleaned, 42);
}

/**
 * Validate an uploaded file against accepted type and size constraints.
 */
export function validatePdfFile(file, maxSizeMb) {
  if (!file) return { valid: false, error: "No file selected." };
  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are supported." };
  }
  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > maxSizeMb) {
    return {
      valid: false,
      error: `File exceeds the ${maxSizeMb}MB limit.`,
    };
  }
  return { valid: true, error: null };
}
