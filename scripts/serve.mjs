import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, sep, extname, join } from "node:path";

const root = resolve("out");
if (!existsSync(join(root, "index.html"))) {
  console.error("Build the static site first: pnpm build");
  process.exit(1);
}
const mime = {
  ".html": "text/html; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".mp4": "video/mp4", ".woff2": "font/woff2", ".ico": "image/x-icon",
};
const server = createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400).end("Bad request"); return; }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(308, { Location: pathname + "/" }).end();
      return;
    }
    file = join(file, "index.html");
  }
  const exists = existsSync(file) && statSync(file).isFile();
  if (!exists) file = join(root, "404.html");
  const size = statSync(file).size;
  const headers = {
    "Content-Type": mime[extname(file)] ?? "application/octet-stream",
    "Cache-Control": pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
    "X-Content-Type-Options": "nosniff",
    "Accept-Ranges": "bytes",
  };
  const range = request.headers.range;
  if (exists && range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    let start = match?.[1] ? Number(match[1]) : 0;
    let end = match?.[2] ? Number(match[2]) : size - 1;
    if (match && !match[1] && match[2]) { start = Math.max(0, size - Number(match[2])); end = size - 1; }
    if (!match || start > end || start >= size) {
      response.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
      return;
    }
    end = Math.min(end, size - 1);
    response.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    if (request.method === "HEAD") response.end();
    else createReadStream(file, { start, end }).pipe(response);
    return;
  }
  response.writeHead(exists ? 200 : 404, { ...headers, "Content-Length": size });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
});
server.listen(Number(process.env.PORT ?? 3000), "0.0.0.0", () => {
  console.log(`3Mo static site ready on port ${process.env.PORT ?? 3000}`);
});
