import type { Logger } from "./types.js";

export function createLogger(prefix: string): Logger {
  return {
    info: (message, data) => console.log(JSON.stringify({ level: "info", prefix, message, ...data })),
    warn: (message, data) => console.warn(JSON.stringify({ level: "warn", prefix, message, ...data })),
    error: (message, data) => console.error(JSON.stringify({ level: "error", prefix, message, ...data })),
    debug: (message, data) => {
      if (process.env.DEBUG) {
        console.debug(JSON.stringify({ level: "debug", prefix, message, ...data }));
      }
    },
  };
}
