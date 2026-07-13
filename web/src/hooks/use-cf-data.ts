"use client";

import { useState, useEffect } from "react";

export interface CfData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar: string;
  solvedCount: number;
  ratingHistory: { 
    contest: string; 
    rating: number; 
    oldRating: number;
    rank: number;
    date: string;
    timestamp: number;
  }[];
  recentSubmissions: {
    id: number;
    problem: string;
    contestId?: number;
    index?: string;
    verdict: string;
    language: string;
    time: number;
    memory: number;
    createdAt: number;
    rating?: number;
    tags: string[];
  }[];
  cached?: boolean;
}

export function useCfData() {
  const [data, setData] = useState<CfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cf")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
