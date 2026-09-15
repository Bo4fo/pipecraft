import type { Config } from "tailwindcss";
import pipecraftPreset from "@pipecraft/tokens/tailwind-preset";

const config: Config = {
  presets: [pipecraftPreset as Config],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
