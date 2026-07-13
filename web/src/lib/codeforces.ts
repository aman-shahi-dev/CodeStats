const CF_API = "https://codeforces.com/api";

export async function getCfUserInfo(handle: string) {
  try {
    const res = await fetch(`${CF_API}/user.info?handles=${handle}`, {
      next: { revalidate: 600 },
    });
    const data = await res.json();
    if (data.status !== "OK") return null;
    return data.result[0];
  } catch {
    return null;
  }
}

export async function getCfRatingHistory(handle: string) {
  try {
    const res = await fetch(`${CF_API}/user.rating?handle=${handle}`, {
      next: { revalidate: 600 },
    });
    const data = await res.json();
    if (data.status !== "OK") return [];
    return data.result;
  } catch {
    return [];
  }
}

export async function getCfSubmissions(handle: string, count = 50) {
  try {
    const res = await fetch(
      `${CF_API}/user.status?handle=${handle}&from=1&count=${count}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    if (data.status !== "OK") return [];
    return data.result;
  } catch {
    return [];
  }
}

export async function validateCfHandle(handle: string): Promise<boolean> {
  try {
    const res = await fetch(`${CF_API}/user.info?handles=${handle}`);
    const data = await res.json();
    return data.status === "OK";
  } catch {
    return false;
  }
}
