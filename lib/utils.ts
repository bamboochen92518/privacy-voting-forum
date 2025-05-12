// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 自訂函式 cn（class names 縮寫）
 * 用來合併多個 CSS class 名稱，並處理 Tailwind class 衝突問題
 *
 * @param inputs - 任意數量的 className，可以是 string、陣列、條件物件等（符合 ClassValue 型別）
 * @returns 處理過的單一 className 字串，已去除衝突與無效項目
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
