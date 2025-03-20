import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["node_modules", "dist"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "lcov", "clover"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/icons/**",
        "src/styles/**",
        "src/assets/**",
        "src/constants/**",
        "src/services/api/api-types/**",
        "**/node_modules/**",
        "**/dist/**",
        "src/routes/enum.ts",
      ],
      all: true,
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
