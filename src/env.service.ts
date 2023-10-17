import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/function";

export interface Environment {
  GITHUB_TOKEN: string;
}

export interface EnvError {
  error: "GITHUB_TOKEN missing";
}

const githubTokenMissing: EnvError = { error: "GITHUB_TOKEN missing" };

export const getEnvironment: TE.TaskEither<EnvError, Environment> = pipe(
  process.env.GITHUB_TOKEN,
  TE.fromNullable(githubTokenMissing),
  TE.map((GITHUB_TOKEN: string) => ({ GITHUB_TOKEN })),
);
