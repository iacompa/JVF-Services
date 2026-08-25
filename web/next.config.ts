import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Next's lint/build integrations still require the TypeScript 6 API.
    // `npm run typecheck` separately uses the pinned TypeScript 7 CLI.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
