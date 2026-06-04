const { execSync } = require("child_process");

try {
  execSync("npx prisma generate", { stdio: "inherit" });
} catch (error) {
  console.error(error);
  process.exit(1);
}