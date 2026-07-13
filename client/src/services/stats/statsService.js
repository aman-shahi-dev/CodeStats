export const statsService = {
  async fetchCodeforces(username) {
    try {
      const [ratingRes, infoRes, statusRes] = await Promise.all([
        fetch(`https://codeforces.com/api/user.rating?handle=${username}`),
        fetch(`https://codeforces.com/api/user.info?handles=${username}`),
        fetch(
          `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`
        ),
      ]);

      const ratingData = await ratingRes.json();

      let contests = [];

      if (ratingData.status === "OK") {
        contests = ratingData.result;
      }

      const recentContests = contests
        .slice(-5)
        .reverse()
        .map((contest) => ({
          name: contest.contestName,
          id: contest.contestId,
          rank: contest.rank,
          ratingUpdateTimeSeconds: contest.ratingUpdateTimeSeconds,
          oldRating: contest.oldRating,
          newRating: contest.newRating,
          changeInRating: contest.newRating - contest.oldRating,
          platform: "codeforces",
        }));

      const infoData = await infoRes.json();

      if (infoData.status !== "OK")
        throw new Error("Codeforces user not found");

      const user = infoData.result[0];

      const statusData = await statusRes.json();

      const solvedSet = new Set();

      statusData.result.forEach((submission) => {
        if (submission.verdict === "OK") {
          solvedSet.add(
            `${submission.problem.contestId}-${submission.problem.index}`
          );
        }
      });

      return {
        cfRating: user.rating ?? 0,
        cfRank: user.rank ?? "unrated",
        cfSolved: solvedSet.size ?? 0,
        cfRecentContests: recentContests,
      };
    } catch (error) {
      console.error("Codeforces fetch error ::", error);
      throw error;
    }
  },
  async fetchtLeetcode(username) {},
  async fetchAtcoder(username) {},
  async fetchAllStats({
    codeforcesUsername,
    leetcodeUsername,
    atcoderUsername,
  }) {},
};
