# Graph Report - .  (2026-06-21)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 288 nodes · 458 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b5ec565c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `useApi()` - 17 edges
3. `compilerOptions` - 16 edges
4. `cn()` - 15 edges
5. `Button` - 9 edges
6. `useAuthStore` - 7 edges
7. `useMusicalInstrumentStore` - 7 edges
8. `tailwind` - 6 edges
9. `aliases` - 6 edges
10. `Card` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Node.js` --conceptually_related_to--> `Frontend Service`  [INFERRED]
  README.md → docker-compose.yml
- `Frontend Service` --implements--> `VITE_API`  [EXTRACTED]
  docker-compose.yml → README.md
- `DialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/core/lib/utils.ts
- `DialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/core/lib/utils.ts
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dropdown-menu.tsx → src/core/lib/utils.ts

## Import Cycles
- None detected.

## Communities (23 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (21): LoginPage(), RegisterPage(), ApiError, AuthResponse, LoginRequest, RegisterRequest, Category, Layout() (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (25): DangerAlertProps, cn(), Alert, AlertDescription, AlertTitle, alertVariants, Avatar, AvatarFallback (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (21): confirmationAlert(), infoAlert(), MySwal, successAlert(), useApi(), UseApiOptions, UseApiResult, useDeleteContact() (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (31): dependencies, class-variance-authority, clsx, @fortawesome/fontawesome-svg-core, @fortawesome/free-brands-svg-icons, @fortawesome/free-regular-svg-icons, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome (+23 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (25): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+17 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (16): TableBodyCustom(), TableBodyProps, TableHeaderCustom(), ListInstrumentsProps, ActionsTable, KeysTable, getColumns(), getColumnsAction() (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (22): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleDetection (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (9): Main Entry Script, Root Div, FormInstrument, FormUpdateInstrument, Layout, LoginPage, MainInstrument, RegisterPage (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.24
Nodes (9): PaginationTableCustom(), PaginationTableCustomProps, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.29
Nodes (6): compilerOptions, baseUrl, paths, files, @/*, references

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (3): Frontend Service, Node.js, VITE_API

## Knowledge Gaps
- **158 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+153 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 0`, `Community 10`, `Community 5`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 3` to `Community 4`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `useApi()` connect `Community 2` to `Community 0`, `Community 5`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _159 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11693548387096774 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._