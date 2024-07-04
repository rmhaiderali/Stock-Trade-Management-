import chalk from "chalk";

const envs = [
  "JWT_SECRET_KEY",
  "OPENAI_API_KEY",
  "PLAID_CLIENT_ID",
  "PLAID_SECRET",
];

for (const env of envs) {
  if (!process.env.hasOwnProperty(env)) {
    const message = 'Add "' + env + '" in .env before starting server.';
    throw new Error(chalk.red(message));
  }
}
