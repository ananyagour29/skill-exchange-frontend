
// services/userService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const getHeaders = (): HeadersInit => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const userService = {
  // Fetch profile by ID with sequential fallback checks
  async getUserProfile(userId: string) {
    try {
      let res = await fetch(`${API_BASE_URL}/api/profile/${userId}`, { headers: getHeaders() });
      
      if (!res.ok) {
        res = await fetch(`${API_BASE_URL}/getUserById/${userId}`, { headers: getHeaders() });
      }

      if (res.ok) {
        const text = await res.text();
        return text ? JSON.parse(text) : null;
      }

      // Fallback: search across all profiles
      const allRes = await fetch(`${API_BASE_URL}/api/profile/all`, { headers: getHeaders() });
      if (allRes.ok) {
        const allProfiles = await allRes.json();
        return Array.isArray(allProfiles)
          ? allProfiles.find(
              (p: any) =>
                String(p.id) === String(userId) ||
                String(p.userId) === String(userId) ||
                String(p.user?.id) === String(userId)
            ) || null
          : null;
      }
    } catch (err) {
      console.warn("Profile fetch error:", err);
    }
    return null;
  },

  // Fetch exchanges related to the user
// Replace lines 100-110 in services/userService.ts with this error-safe block:
async getUserExchanges(userId: string) {
  try {
    // let res = await fetch(`${API_BASE_URL}/api/exchanges/user/${userId}`, { 
    //   headers: typeof getHeaders === 'function' ? getHeaders() : {} 
    // });
let res = await fetch(
  `${API_BASE_URL}/api/exchanges/getByUser/${userId}`,
  {
    headers: getHeaders(),
  }
);
    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/api/exchanges/all`, { 
        headers: typeof getHeaders === 'function' ? getHeaders() : {} 
      });
    }

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("[userService] getUserExchanges network error gracefully caught:", error);
    return []; // Returns empty array instead of throwing uncaught TypeError
  }
},
};

