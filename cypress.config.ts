import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 1000,
  video: true,
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
