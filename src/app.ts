import { TaskEither } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/IOEither";
import { getEnvironment, EnvError, Environment } from "./env.service";
import { Octokit } from "octokit";
import { pipe } from "fp-ts/function";
import { ReaderTaskEither } from "fp-ts/lib/ReaderTaskEither";

export const octokitError = { error: "Octokit init error" } as const;
export const fetchError = (
  msg: unknown,
): { error: "FetchError"; msg: string } => ({
  error: "FetchError",
  msg: JSON.stringify(msg),
});
export type AppError =
  | ReturnType<typeof fetchError>
  | EnvError
  | typeof octokitError;

export interface AppState {
  octokit: Octokit;
}

const createOctokit: (env: Environment) => TaskEither<AppError, Octokit> = ({
  GITHUB_TOKEN,
}) =>
  TE.fromIOEither(
    T.tryCatch(
      () => new Octokit({ auth: GITHUB_TOKEN }),
      () => octokitError,
    ),
  );

export const initEnvironment: TaskEither<AppError, AppState> = pipe(
  getEnvironment,
  TE.chain(createOctokit),
  TE.map((octokit) => ({ octokit })),
);

export type App<T> = ReaderTaskEither<AppState, AppError, T>;

export interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}

export interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

/*
type Either<L, R> = Left<L> | Right<R>
type IO<T> = () => T
type Reader<S, T> = (state: S) => T
type Task<T> = IO<Promise<T>>
type ReaderTaskEither<S, L, R> = Reader<S, Task<Either<L, R>>
*/

export type AppFull<T> = (
  state: AppState,
) => () => Promise<Left<AppError> | Right<T>>;
