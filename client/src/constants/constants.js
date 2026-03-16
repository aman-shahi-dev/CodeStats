// PLATFORM API BASE URL's
export const API = {
  CODEFORCES: "https://codeforces.com/api",
  LEETCODE_GRAPHQL: "https://leetcode.com/graphql",
  ATCODER_PROBLEMS: "https://kenkoooo.com/atcoder/atcoder-api/v3",
};

// PLATFORM METADATA
export const PLATFORMS = {
  codeforces: {
    id: "codeforces",
    label: "Codeforces",
    color: "var(--cf-color)",
    profileUrl: (handle) => `https://codeforces.com/profile/${handle}`,
  },
  leetcode: {
    id: "leetcode",
    label: "Leetcode",
    color: "var(--lc-color)",
    profileUrl: (handle) => `https://leetcode.com/${handle}`,
  },
  atcoder: {
    id: "atcoder",
    label: "Atcoder",
    color: "var(--ac-color)",
    profileUrl: (handle) => `https://atcoder.jp/users/${handle}`,
  },
};

// APP WIDE CONSTANTS
export const APP_NAME = "CodeStats";
export const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
