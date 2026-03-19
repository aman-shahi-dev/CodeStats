export const config = {
  appwrite_endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  appwrite_project_id: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwrite_database_id: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwrite_profiles_collection_id: import.meta.env
    .VITE_APPWRITE_PROFILES_COLLECTION_ID,
  codeforces_base_url: import.meta.env.VITE_CODEFORCES_BASE_URL,
  leetcode_base_url: import.meta.env.VITE_LEETCODE_BASE_URL,
  atcoder_base_url: import.meta.env.VITE_ATCODER_BASE_URL,
  leetcode_proxy_url: import.meta.env.VITE_LEETCODE_PROXY_URL,
};
