import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
http
  .createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = resolve(root, `.${path}`);
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      let info = await stat(file).catch(() => null);
      if (info?.isDirectory()) {
        file = resolve(file, "index.html");
        info = await stat(file).catch(() => null);
      }
      if (!info?.isFile()) {
        res
          .writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
          .end(await readFile(resolve(root, "404.html")));
        return;
      }
      res
        .writeHead(200, {
          "Content-Type": mime[extname(file)] || "application/octet-stream",
        })
        .end(await readFile(file));
    } catch {
      res.writeHead(500).end();
    }
  })
  .listen(3000, "127.0.0.1", () => console.log("Local: http://127.0.0.1:3000"));
