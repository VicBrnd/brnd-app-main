import type { app } from "@/app/api/[[...slug]]/route";

import { treaty } from "@elysiajs/eden";

// Client-side only: uses type inference for type-safe HTTP requests
export const api = treaty<typeof app>("localhost:3000").api;
