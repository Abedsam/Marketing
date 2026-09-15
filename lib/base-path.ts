// Matches the basePath configured in next.config.ts. next/image's automatic
// basePath prefixing isn't reliable for local /public assets with
// output: "export" + unoptimized images on this Next.js version, so plain
// <img> tags that reference /public files use this constant directly.
export const BASE_PATH = "/Marketing";
