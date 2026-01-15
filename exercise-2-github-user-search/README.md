# Exercise 2 - Github User Search

## Overview
Single-page React app that searches Github users and displays results as cards.
The UI supports selection, duplication, and deletion of cards, with clear loading
and empty states. The search input is debounced to avoid excessive API calls.

## Features
- Search Github users with a debounced input.
- Request lifecycle states: idle, loading, success, error.
- Rate limit feedback when Github API returns 403 with no remaining quota.
- Stale request guard + abort to avoid race conditions on fast typing.
- Cards list with select-all, duplicate, and delete actions.
- Edit mode toggle to enable/disable selection and actions.
- Loading overlay and user-friendly empty/error messages.
- No pagination (current results are limited to the API's first page).
- Tests for hooks and UI behavior.

## Tech stack
- TypeScript
- React 19
- Vite
- Vitest + Testing Library

## Project structure
- `src/api/github.ts`: API call to Github search endpoint.
- `src/hooks/useGithubUserSearch.ts`: data fetching and request state.
- `src/hooks/useDebouncedValue.ts`: debounce hook for the query input.
- `src/components/`: UI components (search bar, list, cards, header).
- `src/tests/`: unit and integration tests.

## Scripts
From this folder:
```
npm install
npm run dev
npm run build
npm run preview
npm run test
```

From the repo root, you can also use:
```
npm run install:all
npm run test:ex2
npm run start:ex2
```

## Usage
1) Start the dev server with `npm run dev`.
2) Type a username in the search bar.
3) Use edit mode to select cards, then duplicate or delete them.

## Tests
- Unit tests cover hooks and UI behavior.
- Run the full test suite with `npm run test -- --run`.

## Notes
- The list height adapts to the viewport via flex layout in `src/App.css`.
- The request guard prevents stale responses from overwriting recent results.
