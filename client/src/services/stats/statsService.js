import { config } from "../../config/config";

export const statsService = {
  async fetchCodeforces(username) {
    try {
      const [infoRes, ratingRes, statusRes] = await Promise.all([
        fetch(`${config.codeforces_base_url}/user.info?handles=${username}`),
        fetch(`${config.codeforces_base_url}/user.rating?handle=${username}`),
        fetch(`${config.codeforces_base_url}/user.status?handle=${username}`),
      ]);

      const infoData = await infoRes.json();
      if (infoData.status !== "OK")
        throw new Error("Codeforces user not found");

      const statusData = await statusRes.json();
      const solvedSet = new Set();
      if (statusData.status === "OK") {
        statusData.result.forEach((sub) => {
          if (sub.verdict === "OK") {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });
      }

      const user = infoData.result[0];
      let contests = [];
      if (ratingRes.ok) {
        const ratingData = await ratingRes.json();
        if (ratingData.status === "OK") contests = ratingData.result;
      }

      const recentContests = contests
        .slice(-5)
        .reverse()
        .map((c) => ({
          name: c.contestName,
          date: new Date(c.ratingUpdateTimeSeconds * 1000).toISOString(),
          delta: c.newRating - c.oldRating,
          platform: "cf",
        }));

      return {
        cfRating: user.rating ?? 0,
        cfRank: user.rank ?? "unrated",
        cfSolved: solvedSet.size,
        cfContests: recentContests,
      };
    } catch (error) {
      console.error("Codeforces fetch error ::", error);
      throw error;
    }
  },

  async fetchLeetCode(username) {
    try {
      const query = `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
            }
          }
        }
      `;

      const res = await fetch(config.leetcode_proxy_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { username } }),
      });

      const result = await res.json();
      const user = result.data?.matchedUser;
      if (!user) throw new Error("LeetCode user not found");

      const acStats = user.submitStatsGlobal.acSubmissionNum;
      const easy = acStats.find((s) => s.difficulty === "Easy")?.count ?? 0;
      const medium = acStats.find((s) => s.difficulty === "Medium")?.count ?? 0;
      const hard = acStats.find((s) => s.difficulty === "Hard")?.count ?? 0;

      return {
        lcRating: null,
        lcGlobalRank: user.profile.ranking ?? null,
        lcSolved: easy + medium + hard,
        lcEasy: easy,
        lcMedium: medium,
        lcHard: hard,
      };
    } catch (error) {
      console.error("LeetCode fetch error ::", error);
      throw error;
    }
  },

  async fetchAtCoder(username) {
    try {
      // Using the exact path that worked in your screenshot
      const res = await fetch(
        `/api/atcoder-stats/atcoder/atcoder-api/v3/user_info?user=${username}`
      );

      if (!res.ok) throw new Error(`AtCoder API Error: ${res.status}`);

      const data = await res.json();

      if (!data || data.user_id !== username) {
        throw new Error("AtCoder user not found");
      }

      return {
        // Based on the JSON in your screenshot:
        acRating: data.rating ?? 0,
        acRank: data.rating ? this.getAtCoderColor(data.rating) : "unrated",
        acSolved: data.accepted_count ?? 0, // This is right there in the JSON!
      };
    } catch (error) {
      console.error("AtCoder fetch error ::", error);
      throw error;
    }
  },

  getAtCoderColor(rating) {
    if (rating < 400) return "Gray";
    if (rating < 800) return "Brown";
    if (rating < 1200) return "Green";
    if (rating < 1600) return "Cyan";
    if (rating < 2000) return "Blue";
    if (rating < 2400) return "Yellow";
    if (rating < 2800) return "Orange";
    return "Red";
  },

  async fetchAllStats({
    codeforcesUsername,
    leetcodeUsername,
    atcoderUsername,
  }) {
    const results = await Promise.allSettled([
      codeforcesUsername
        ? this.fetchCodeforces(codeforcesUsername)
        : Promise.resolve(null),
      leetcodeUsername
        ? this.fetchLeetCode(leetcodeUsername)
        : Promise.resolve(null),
      atcoderUsername
        ? this.fetchAtCoder(atcoderUsername)
        : Promise.resolve(null),
    ]);

    const [cf, lc, ac] = results.map((r) =>
      r.status === "fulfilled" ? r.value : null
    );

    return {
      ...(cf ?? {}),
      ...(lc ?? {}),
      ...(ac ?? {}),
      cfContests: cf?.cfContests ?? [],
      lastFetchedAt: new Date().toISOString(),
      errors: {
        cf:
          results[0].status === "rejected" ? results[0].reason?.message : null,
        lc:
          results[1].status === "rejected" ? results[1].reason?.message : null,
        ac:
          results[2].status === "rejected" ? results[2].reason?.message : null,
      },
    };
  },
};
