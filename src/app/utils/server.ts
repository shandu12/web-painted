const dev = process.env.NODE_ENV !== "production";

export const server = dev ?  "http://localhost:3000/api" : "https://web-painted-tyza.vercel.app/api";
