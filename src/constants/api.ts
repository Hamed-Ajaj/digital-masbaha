/**
 * Base URL for the azkar API.
 *
 * Set `VITE_API_URL` in your environment (e.g. a `.env` file or the Vercel
 * project settings) to point at the deployed API. It falls back to the local
 * dev server so `npm run dev` works out of the box.
 *
 * Example: VITE_API_URL=https://azkar-api.vercel.app
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";
