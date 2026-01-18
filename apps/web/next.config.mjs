/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "discord.com" },
      { protocol: "https", hostname: "www.discord.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "open-meteo.com" },
      { protocol: "https", hostname: "www.teams.com" },
      { protocol: "https", hostname: "www.slack.com" },
      { protocol: "https", hostname: "www.pipedream.com" },
      { protocol: "https", hostname: "www.microsoft.com" },
      { protocol: "https", hostname: "statics.teams.cdn.office.net" },
    ],
  },
};

export default nextConfig;
