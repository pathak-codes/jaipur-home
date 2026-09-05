# OpenCode Setup Guide — Project

## 1. Create the workspace

Use the project root containing:
- AGENTS.md
- docs/
- .opencode/

Open that exact folder in OpenCode.

## 2. Do not run /init blindly

OpenCode's /init can inspect a repository and create/update AGENTS.md. For this project, AGENTS.md is intentionally authored around the product requirements, so preserve it.

If /init is used later, review its proposed changes before accepting them.

## 3. First OpenCode session

Start in Plan mode.

Initial prompt:

> You are entering an existing product-specification workspace. Do not write application code yet.
>
> First, study AGENTS.md and all project documents under docs/.
>
> Build a concise internal understanding of:
> 1. product purpose
> 2. users/roles
> 3. confirmed requirements
> 4. pending requirements
> 5. domain entities
> 6. job state machine
> 7. prototype scope
> 8. design constraints
> 9. security constraints
> 10. architecture boundaries
>
> Do not invent missing decisions.
> Do not modify files.
> Report contradictions, ambiguities, missing dependencies, and implementation risks you find.
> At the end, provide a proposed first implementation plan for the Phase 1 frontend only.

## 4. Second prompt after review

Only after we inspect the study result:

> Based strictly on the project documents, create the implementation plan for the first frontend slice described in docs/PROTOTYPE_SCOPE.md. Do not implement yet. Identify exact files, components, data structures, dependencies and verification steps. Do not invent business rules.

## 5. Build phase

Switch to Build only after the plan is reviewed.

Use small tasks:
- foundation
- design tokens
- landing
- customer entry
- service selection
- request form
- matching simulation
- provider accepted
- provider dashboard
- incoming request

## 6. Never give the agent “build the whole app”
Large vague prompts are prohibited for this project.

## 7. Model selection
Use the free models confirmed in the current OpenCode environment. Prefer a strong reasoning model for planning/review and a fast coding model for implementation. Do not assume a model is free based only on a UI label; verify its provider/model ID and pricing before relying on it.

## 8. Superpowers
Use the installed Superpowers skills where they improve planning, implementation discipline, testing or review. Do not let a skill override the project PRD or confirmed business rules.

## 9. Before each session
Check:
- current git branch
- current diff
- project instructions
- active model
- relevant docs

## 10. After each meaningful change
Run verification and inspect the diff before moving to the next feature.
