# Spec: Content Models & Component Contracts

> Spec-driven development document for the Astro + Starlight blog.
> Source of truth for the shared data models, their validation rules, and the
> component contracts that consume them. Implementation lives in
> [`src/models/content.ts`](../src/models/content.ts).

## 1. Goal

Centralise the data shapes that were previously duplicated across components
(`Project`, `Article`, navigation cards, table-of-contents entries) into a
single, validated module. Every model is declared once as a [Zod](https://zod.dev)
schema (imported directly from `zod`) and its static TypeScript type is
**inferred** from that schema, so the
runtime validation and the compile-time type can never drift apart.

## 2. Principles

- **Single source of truth** — one schema per concept, types derived via `z.infer`.
- **Validate at the boundary** — static/author-provided data is parsed with Zod
  at module load so malformed content fails the build, not the browser.
- **Reuse components** — presentational cards (`ProjectCard`, `CardItem`,
  `TocCard`) are fed by the shared models instead of ad-hoc inline types.
- **Readable Astro** — frontmatter keeps all imports at the top, no `any`.

## 3. Data models

All schemas are exported from `src/models/content.ts`.

### 3.1 `tagSchema`
A short, non-empty label.

```ts
z.string().min(1)
```

### 3.2 `projectSchema` → `Project`
Showcase project rendered by `ProjectCards` and `ProjectThumbnails`.

| Field         | Schema                         | Notes                          |
| ------------- | ------------------------------ | ------------------------------ |
| `title`       | `z.string().min(1)`            | Display name                   |
| `description` | `z.string()`                   | Short summary                  |
| `imageUrl`    | `z.string()`                   | Thumbnail path                 |
| `link`        | `z.string()`                   | Internal route                 |
| `tags`        | `z.array(tagSchema).default([])` | Tech stack, defaults to empty |

### 3.3 `articleSchema` → `Article`
Blog article summary for the "Latest Articles" list.

| Field         | Schema                              | Notes                     |
| ------------- | ----------------------------------- | ------------------------- |
| `title`       | `z.string().min(1)`                 | Article title             |
| `url`         | `z.string()`                        | Resolved docs href        |
| `tags`        | `z.array(tagSchema).optional()`     | Optional tag list         |
| `createdDate` | `z.date().optional()`               | Publish date              |
| `duration`    | `z.number().int().nonnegative()`    | Reading time in minutes   |

### 3.4 `navCardSchema` → `NavCard`
Navigation card used by `Splash` to link to a docs section.

| Field       | Schema                          | Notes                          |
| ----------- | ------------------------------- | ------------------------------ |
| `title`     | `z.string().min(1)`             | Card label                     |
| `icon`      | `z.custom<StarlightIcon>(...)`  | Starlight icon name            |
| `iconColor` | `z.string()`                    | Starlight colour token         |
| `url`       | `z.string()`                    | Section route                  |

### 3.5 `tocEntrySchema` → `TocEntry`
Table-of-contents entry derived from a docs collection page.

| Field           | Schema         | Notes                     |
| --------------- | -------------- | ------------------------- |
| `subFolderName` | `z.string()`   | Grouping key ("" = root)  |
| `slug`          | `z.string()`   | Resolved href             |
| `title`         | `z.string()`   | Page title                |

## 4. Helpers

- `parseProjects(data: unknown): Project[]` — validates an array of projects.
- `parseNavCards(data: unknown): NavCard[]` — validates an array of nav cards.

## 5. Component contracts

| Component                | Consumes      | Responsibility                                  |
| ------------------------ | ------------- | ----------------------------------------------- |
| `ProjectCards.astro`     | `Project[]`   | Renders `ProjectCard` grid                      |
| `ProjectThumbnails.astro`| `Project[]`   | Renders coloured initial tiles                  |
| `LatestArticles.astro`   | `Article[]`   | Lists newest blog posts with reading time       |
| `Splash.astro`           | `NavCard[]`   | Renders `CardItem` navigation grid              |
| `TableOfContent.astro`   | `TocEntry[]`  | Groups docs pages into `TocCard` sections       |

## 6. Acceptance criteria

- [ ] Every model is defined once as a Zod schema; types use `z.infer`.
- [ ] Static data (`projects`, nav cards) is parsed with Zod at module load.
- [ ] No `any` types remain in the refactored components.
- [ ] `astro check` passes with no new errors.
- [ ] Existing rendered output is unchanged (same data, same markup).
