"use client";

import { useState } from "react";
import { useCfData } from "@/hooks/use-cf-data";
import { IconLoader2, IconChevronLeft, IconChevronRight, IconSearch } from "@tabler/icons-react";

function verdictClass(verdict: string) {
  if (verdict === "OK") return "verdict-ac";
  if (verdict === "WRONG_ANSWER") return "verdict-wa";
  if (verdict === "TIME_LIMIT_EXCEEDED") return "verdict-tle";
  return "bg-surface-5/50 text-text-muted";
}

function verdictLabel(verdict: string) {
  if (verdict === "OK") return "ACCEPTED";
  if (verdict === "WRONG_ANSWER") return "WRONG ANSWER";
  if (verdict === "TIME_LIMIT_EXCEEDED") return "TIME LIMIT";
  if (verdict === "RUNTIME_ERROR") return "RUNTIME ERR";
  if (verdict === "COMPILATION_ERROR") return "COMPILE ERR";
  return verdict;
}

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ITEMS_PER_PAGE = 10;

export function RecentSubmissions() {
  const { data, loading, error } = useCfData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and Sort newest first
  const allSubmissions = [...(data?.recentSubmissions || [])]
    .filter(s => s.problem.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.id - a.id);
  
  const totalPages = Math.ceil(allSubmissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubmissions = allSubmissions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when searching
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden mb-4">
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-xs font-medium uppercase">Recent Submissions</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-6 px-3 py-1.5 rounded-md border border-border">
            <IconSearch size={14} className="text-text-muted mr-2" />
            <input 
              className="bg-transparent border-none outline-none text-xs w-full sm:w-48 placeholder:text-text-muted/50" 
              placeholder="Search problems..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <a
            href={`https://codeforces.com/submissions/${data?.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand text-[10px] font-bold uppercase hover:underline whitespace-nowrap"
          >
            View on CF →
          </a>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <IconLoader2 size={24} className="text-brand animate-spin" />
        </div>
      ) : error ? (
        <div className="p-6 text-center text-text-muted text-sm">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-7/50 text-text-muted text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Problem</th>
                  <th className="px-4 py-3">Verdict</th>
                  <th className="px-4 py-3">Language</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Memory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentSubmissions.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-5/20 transition-colors">
                    <td className="px-4 py-4 text-text-muted text-xs whitespace-nowrap">
                      {formatDate(s.createdAt)}
                    </td>
                    <td className="px-4 py-4 max-w-[200px] truncate">
                      {s.contestId && s.index ? (
                        <a 
                          href={`https://codeforces.com/contest/${s.contestId}/problem/${s.index}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand hover:underline transition-colors"
                        >
                          {s.problem}
                        </a>
                      ) : (
                        s.problem
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${verdictClass(s.verdict)}`}>
                        {verdictLabel(s.verdict)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-text-secondary text-xs">{s.language}</td>
                    <td className="px-4 py-4 text-text-secondary font-mono text-xs">{s.time}ms</td>
                    <td className="px-4 py-4 text-text-secondary font-mono text-xs">
                      {(s.memory / 1024).toFixed(0)}KB
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-surface-2/50">
              <span className="text-xs text-text-muted">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, allSubmissions.length)} of {allSubmissions.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md hover:bg-surface-5 text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevronLeft size={18} />
                </button>
                <span className="text-xs font-medium px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-md hover:bg-surface-5 text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
