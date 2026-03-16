/**
 * Codeforces handles: 3–24 chars, letters/digits/underscores/hyphens
 */
export function isValidCFHandle(handle) {
  return /^[a-zA-Z0-9_-]{3,24}$/.test(handle);
}

/**
 * LeetCode usernames: 1–25 chars, letters/digits/hyphens/underscores
 */
export function isValidLCUsername(username) {
  return /^[a-zA-Z0-9_-]{1,25}$/.test(username);
}

/**
 * AtCoder usernames: 3–16 chars, letters/digits/underscores
 */
export function isValidACUsername(username) {
  return /^[a-zA-Z0-9_]{3,16}$/.test(username);
}

/**
 * Generic — validate a platform handle by platform key
 */
export function validateHandle(platform, handle) {
  if (!handle || handle.trim() === "") return "Username cannot be empty.";
  const h = handle.trim();
  if (platform === "codeforces" && !isValidCFHandle(h))
    return "Invalid Codeforces handle (3–24 chars, letters/digits/-/_).";
  if (platform === "leetcode" && !isValidLCUsername(h))
    return "Invalid LeetCode username (1–25 chars).";
  if (platform === "atcoder" && !isValidACUsername(h))
    return "Invalid AtCoder username (3–16 chars).";
  return null; // valid
}
