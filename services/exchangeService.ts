const API_BASE_URL =
process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface SkillExchangeDTO {
  id?: number;
  requesterId: number;
  providerId: number;
  offeredSkill: string;
  requestedSkill: string;
  notes?: string;
  status?: string;
  requesterName?: string;
  providerName?: string;
}

export const exchangeService = {
  // ==========================
  // GET USER EXCHANGES
  // ==========================
  getUserExchanges: async (
    userId: number
  ): Promise<SkillExchangeDTO[]> => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/exchanges/getByUser/${userId}`
      );

      if (!res.ok) {
        console.warn(
          `[exchangeService] Failed to fetch exchanges: ${res.status}`
        );
        return [];
      }

      return await res.json();
    } catch (error) {
      console.error("[exchangeService] Fetch failed:", error);
      return [];
    }
  },

  // ==========================
  // CREATE EXCHANGE
  // ==========================
  createExchange: async (dto: SkillExchangeDTO) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/exchanges/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          message: data.message || "Failed to send exchange request.",
        };
      }

      return data;
    } catch (error) {
      console.error("[exchangeService] Create exchange error:", error);
      return {
        message: "Unable to connect to backend.",
      };
    }
  },

  // ==========================
  // UPDATE STATUS
  // ==========================
  updateStatus: async (
    exchangeId: number,
    status: string
  ) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/exchanges/updateStatus/${exchangeId}?status=${status}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        console.warn(
          `[exchangeService] Update failed: ${res.status}`
        );
        return null;
      }

      return await res.json();
    } catch (error) {
      console.error("[exchangeService] Update status error:", error);
      return null;
    }
  },
};