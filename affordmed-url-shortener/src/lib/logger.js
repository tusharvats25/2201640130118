const API_BASE = process.env.REACT_APP_API_BASE;
const TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const LEVELS = ["debug", "info", "warn", "error", "fatal"];
const FRONT_PACKAGES = [
  "component",
  "hook",
  "api",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils"
];

export async function log(stack, level, pkg, message) {
  try {
    const payload = {
      stack: String(stack || "frontend").toLowerCase(),
      level: LEVELS.includes(String(level).toLowerCase())
        ? String(level).toLowerCase()
        : "info",
      package: FRONT_PACKAGES.includes(String(pkg).toLowerCase())
        ? String(pkg).toLowerCase()
        : "utils",
      message: String(message)
    };

    if (!API_BASE || !TOKEN) return;

    await fetch(`${API_BASE}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(payload)
    });
  } catch (_) {}
}

export const Log = {
  debug: (pkg, msg) => log("frontend", "debug", pkg, msg),
  info: (pkg, msg) => log("frontend", "info", pkg, msg),
  warn: (pkg, msg) => log("frontend", "warn", pkg, msg),
  error: (pkg, msg) => log("frontend", "error", pkg, msg),
  fatal: (pkg, msg) => log("frontend", "fatal", pkg, msg)
};