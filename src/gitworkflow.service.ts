import * as TE from "fp-ts/lib/TaskEither";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { AppError, AppState, fetchError, App, AppFull } from "./app";
import { RestEndpointMethodTypes } from "@octokit/action";
import { pipe } from "fp-ts/lib/function";

export type ListRepoWorkflowsResponse =
  RestEndpointMethodTypes["actions"]["listRepoWorkflows"]["response"];
export type Workflow =
  RestEndpointMethodTypes["actions"]["listRepoWorkflows"]["response"]["data"]["workflows"][number];

export const fetchWorkflows: (
  owner: string,
  repo: string,
) => AppFull<Array<Workflow>> = (owner, repo) =>
  pipe(
    RTE.asksReaderTaskEither<AppState, AppError, ListRepoWorkflowsResponse>(
      ({ octokit }) =>
        RTE.fromTaskEither(
          TE.tryCatch(
            () => octokit.rest.actions.listRepoWorkflows({ owner, repo }),
            fetchError,
          ),
        ),
    ),
    RTE.flatMap((data) =>
      data.status === 200
        ? RTE.right(data.data.workflows)
        : RTE.left(fetchError(JSON.stringify(data))),
    ),
  );

export type WorkflowRunResponse =
  RestEndpointMethodTypes["actions"]["listWorkflowRuns"]["response"];
export type WorkflowRun =
  RestEndpointMethodTypes["actions"]["listWorkflowRuns"]["response"]["data"]["workflow_runs"][number];

export const fetchWorkflowRuns =
  (owner: string, repo: string) =>
  (workflow: Workflow): App<Array<WorkflowRun>> =>
    pipe(
      RTE.asksReaderTaskEither<AppState, AppError, WorkflowRunResponse>(
        ({ octokit }) =>
          RTE.fromTaskEither(
            TE.tryCatch(
              () =>
                octokit.request(
                  "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
                  { owner, repo, workflow_id: workflow.id },
                ),
              fetchError,
            ),
          ),
      ),
      RTE.flatMap((data) =>
        data.status === 200
          ? RTE.right(data.data.workflow_runs)
          : RTE.left(fetchError(JSON.stringify(data))),
      ),
    );

export type WorkflowRunTimingResponse =
  RestEndpointMethodTypes["actions"]["getWorkflowRunUsage"]["response"];
export type WorkflowRunTiming =
  RestEndpointMethodTypes["actions"]["getWorkflowRunUsage"]["response"]["data"];

export const fetchWorkflowRunTiming =
  (owner: string, repo: string) =>
  (run: WorkflowRun): App<WorkflowRunTiming> =>
    pipe(
      RTE.asksReaderTaskEither<AppState, AppError, WorkflowRunTimingResponse>(
        ({ octokit }) =>
          RTE.fromTaskEither(
            TE.tryCatch(
              () =>
                octokit.request(
                  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing",
                  { owner, repo, run_id: run.id },
                ),
              fetchError,
            ),
          ),
      ),
      RTE.flatMap((data) =>
        data.status === 200
          ? RTE.right(data.data)
          : RTE.left(fetchError(JSON.stringify(data))),
      ),
    );
