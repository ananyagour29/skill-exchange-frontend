export const APP_NAME = "SkillExchange";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

export const SKILL_TYPES = [
  "TEACHING",
  "LEARNING",
  "BOTH",
] as const;

export const USER_ROLES = [
  "LEARNER",
  "TEACHER",
  "BOTH",
] as const;

export const DEFAULT_PAGE_SIZE = 10;

export const MAX_BIO_LENGTH = 500;