import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Public backend address and publishable key (safe to ship in the browser).
// Fallbacks keep published builds working when .env is not available at build time.
const FALLBACK_SUPABASE_URL = "https://addbnjmjiltxxegetlhg.supabase.co";
const FALLBACK_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGJuam1qaWx0eHhlZ2V0bGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5OTY2OTEsImV4cCI6MjA4MzU3MjY5MX0.dkMs1s_oQ2FKJbIq49Sa1Os0AUs2YGBi-L3zPcDAFEU";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_KEY),
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
};
});
