import { birthdayConfig } from '../data/birthdayConfig';

const API_BASE = '/api';

export const api = {
  // Memories
  async getMemories() {
    try {
      const res = await fetch(`${API_BASE}/memories`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (err) {
      console.warn("Backend API offline, using fallback memory config:", err);
    }
    return birthdayConfig.memories;
  },

  async addMemory(memoryData) {
    try {
      const res = await fetch(`${API_BASE}/memories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memoryData)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn("Backend API offline for addMemory:", err);
    }
    return { ...memoryData, _id: Date.now().toString() };
  },

  // Game Results
  async saveGameResult(game, score, details = {}) {
    try {
      const res = await fetch(`${API_BASE}/game-results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game, score, details })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn("Backend API offline for saveGameResult:", err);
    }
    return { game, score, completedAt: new Date().toISOString() };
  },

  // Messages / Love Notes
  async submitMessage(sender, message) {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, message })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn("Backend API offline for submitMessage:", err);
    }
    return { sender, message, createdAt: new Date().toISOString() };
  },

  async getMessages() {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn("Backend API offline for getMessages:", err);
    }
    return [];
  }
};
