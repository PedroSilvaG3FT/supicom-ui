/** @type {import('next').NextConfig} */

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import createNextIntlPlugin from "next-intl/plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  images: { domains: ["api.microlink.io"] },
  sassOptions: {
    includePaths: [join(__dirname, "styles")],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
