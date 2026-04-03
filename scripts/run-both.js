const { spawn } = require("child_process");
const path = require("path");

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "cmd.exe" : "npm";

function runService(name, cwd, args) {
  const commandArgs = isWindows ? ["/c", "npm", ...args] : args;

  const child = spawn(npmCommand, commandArgs, {
    cwd,
    stdio: "inherit",
    shell: false,
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      process.exit(code || 1);
    }
  });

  child.on("error", (error) => {
    console.error(`Failed to start ${name}:`, error.message);
    process.exit(1);
  });

  return child;
}

const rootDir = __dirname ? path.resolve(__dirname, "..") : process.cwd();
const backendDir = path.join(rootDir, "backend");
const frontendDir = path.join(rootDir, "frontend");

const backend = runService("backend", backendDir, ["run", "dev"]);
const frontend = runService("frontend", frontendDir, ["start"]);

function shutdown(signal) {
  backend.kill(signal);
  frontend.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
