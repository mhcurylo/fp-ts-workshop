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
import { flatMap } from "fp-ts/lib/TaskEither";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as E from "fp-ts/lib/Either";

const owner = "IMGARENA";
const repo = "Streaming-SDK";

const app: App<ReadonlyArray<WorkflowRunTiming>> = pipe(
  fetchWorkflows(owner, repo),
  RTE.flatMap(RTE.traverseArray(fetchWorkflowRuns(owner, repo))),
  RTE.map(RA.flatMap((x) => x)),
  RTE.flatMap(RTE.traverseArray(fetchWorkflowRunTiming(owner, repo))),
);

pipe(initEnvironment, flatMap(app))().then(flow(E.map(x => x[0]), E.getOrElseW(e => 'ERROR'), JSON.stringify, console.log));
