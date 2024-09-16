/** @type {import('next').NextConfig} */
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  images: {
    domains: ["api.microlink.io"],
  },
  sassOptions: {
    includePaths: [join(__dirname, "styles")],
  },
};

export default nextConfig;
