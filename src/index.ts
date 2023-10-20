import {
  WorkflowRun,
  WorkflowRunTiming,
  fetchWorkflowRunTiming,
  fetchWorkflowRuns,
  fetchWorkflows,
} from "./gitworkflow.service";
import { App, initEnvironment } from "./app";
import * as RA from "fp-ts/lib/ReadonlyArray";
import { flow, pipe } from "fp-ts/lib/function";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as TE from "fp-ts/lib/TaskEither";

const owner = "IMGARENA";
const repo = "Streaming-SDK";

// (state: { octokit}) => () => Promise<Left<AppError> | Right<ReadonlyArray<WorkflowRunTiming>>>;


const app: App<ReadonlyArray<WorkflowRunTiming>> = pipe(
  fetchWorkflows(owner, repo),
  RTE.flatMap(RTE.traverseArray(fetchWorkflowRuns(owner, repo))),
  RTE.map(RA.flatMap((x) => x)),
  RTE.flatMap(RTE.traverseArray(fetchWorkflowRunTiming(owner, repo))),
);

// initEnvironment is a TaskEither, so:  () => Promise<Either<EnvError, AppState>>
initEnvironment().then(console.log);


