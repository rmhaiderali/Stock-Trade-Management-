import chalk from "chalk";

const envs = ["JWT_SECRET_KEY"];

for (const env of envs) {
  if (!process.env.hasOwnProperty(env)) {
    const message = 'Add "' + env + '" in .env before starting server.';
    throw new Error(chalk.red(message));
  }
}
